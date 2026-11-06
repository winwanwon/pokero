import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { AppState, PokerMode } from "../enum";
import { User, UserDatabase } from "../types";
import { getAverageFromResult, getMajorityFromResult, isValidRoomName, isValidUserName } from "../utils";
import { getPokerOptions } from "../constants/pokerMode";
import { useNotification } from "../contexts/NotificationContext";

import PopUpModal from "../components/PopUpModal";
import OptionButtonGroup from "../components/OptionButtonGroup";
import CommandButton from "../components/CommandButton";
import PlayArea from "../components/PlayArea";
import Result from "../components/Result";
import RoomDetail from "../components/RoomDetail";
import Header from "../components/Header";
import SettingsSidebar from "../components/SettingsSidebar";
import OfflineIndicator from "../components/OfflineIndicator";
import LoadingSkeleton from "../components/LoadingSkeleton";

interface Props {
    firebaseApp: FirebaseApp;
}

const InRoom: React.FC<Props> = (props: Props) => {
    const app = props.firebaseApp;
    const analytics = getAnalytics();
    const database = getDatabase(app);
    const uuid = window.localStorage.getItem("uuid") || uuidv4();
    window.localStorage.setItem("uuid", uuid);
    const { toast } = useToast();
    const { notificationsEnabled, requestNotificationPermission } = useNotification();
    const hasNotifiedRef = useRef(false);

    const params = useParams();
    const roomName = params.roomName?.toLowerCase() || "";
    const [name, setName] = useState(window.localStorage.getItem("name") || "");
    const [modalOpen, setModalOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [appState, setAppState] = useState<AppState>(AppState.Init);
    const [pokerMode, setPokerMode] = useState<PokerMode>(PokerMode.Fibonacci);
    const [selectedOption, setSelectedOption] = useState<number | string>(-1);
    const [users, setUsers] = useState<UserDatabase>({});
    const [sudoMode, setSudoMode] = useState<boolean>(false);
    const [visibility, setVisibility] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [connectionError, setConnectionError] = useState(false);

    const usersDbPath = roomName + '/users/';
    const stateDbPath = roomName + '/state/';
    const thisUserDbPath = usersDbPath + uuid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidRoomName(roomName)) {
            navigate('/');
        }
    }, [roomName, navigate]);

    // Request notification permission
    useEffect(() => {
        requestNotificationPermission();
    }, [requestNotificationPermission]);

    // Notify once when the user becomes the last person who hasn't voted
    useEffect(() => {
        const userList = Object.keys(users);
        const isLastOne = appState === AppState.Init
            && !!users[uuid]
            && userList.length >= 2
            && userList.every((key) => (users[key].selectedOption === -1) === (key === uuid));

        if (!isLastOne) {
            hasNotifiedRef.current = false;
            return;
        }

        if (hasNotifiedRef.current || !notificationsEnabled || !('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        hasNotifiedRef.current = true;
        const title = 'Your turn to vote';
        const body = 'Everyone else has voted.';

        try {
            const notification = new Notification(title, { body });
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        } catch {
            // Chrome on Android doesn't allow new Notification(), so show it in the page instead.
            toast({ title, description: body });
        }
    }, [users, uuid, appState, notificationsEnabled, toast]);

    useEffect(() => {
        const usersUnsubscribe = onValue(
            ref(database, usersDbPath),
            (snapshot) => {
                const dbSnap = snapshot.val();
                if (snapshot.size) {
                    setUsers(dbSnap);
                    !dbSnap[uuid] && setModalOpen(true);
                }
                setIsLoading(false);
                setConnectionError(false);
            },
            (error) => {
                console.error('Error loading users:', error);
                setConnectionError(true);
                setIsLoading(false);
            }
        );

        const stateUnsubscribe = onValue(
            ref(database, stateDbPath),
            (snapshot) => {
                const dbSnap = snapshot.val();
                if (dbSnap) {
                    setAppState(dbSnap.currentState);
                    setPokerMode(dbSnap.pokerMode);
                    dbSnap.currentState === AppState.Revealed && setSelectedOption(-1);
                }
            },
            (error) => {
                console.error('Error loading state:', error);
                setConnectionError(true);
            }
        );

        const userUnsubscribe = onValue(
            ref(database, thisUserDbPath),
            (snapshot) => {
                const dbSnap = snapshot.val();
                setSelectedOption(dbSnap?.selectedOption);
            }
        );

        get(ref(database, stateDbPath))
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    return set(ref(database, stateDbPath), {
                        currentState: AppState.Init,
                        pokerMode: PokerMode.Fibonacci,
                    });
                } else {
                    setAppState(snapshot.val().currentState);
                    setPokerMode(snapshot.val().pokerMode);
                }
            })
            .catch((error) => {
                console.error('Error initializing state:', error);
                setConnectionError(true);
                toast({
                    title: "Can't connect",
                    description: "Check your connection and try again.",
                    variant: "destructive",
                });
            });

        return () => {
            usersUnsubscribe();
            stateUnsubscribe();
            userUnsubscribe();
        };
    }, [database, stateDbPath, thisUserDbPath, usersDbPath, uuid, toast]);

    const onOptionSelect = (option: number | string) => {
        update(ref(database, thisUserDbPath), {
            selectedOption: option,
        });
    };

    const onPokerModeSelect = (pokerMode: PokerMode) => {
        setPokerMode(pokerMode);
        update(ref(database, stateDbPath), {
            currentState: appState,
            pokerMode: pokerMode,
        });
        resetAppState();
    };

    const onAppStateUpdate = (appState: AppState) => {
        setAppState(appState);
        update(ref(database, stateDbPath), {
            currentState: appState,
            pokerMode: pokerMode,
        });
    }

    const resetAppState = () => {
        get(ref(database, usersDbPath)).then((snapshot) => {
            if (snapshot.exists()) {
                Object.keys(snapshot.val()).forEach((key: string) => {
                    const updates = {} as any;
                    updates['/' + key + '/selectedOption/'] = -1;
                    update(ref(database, usersDbPath), updates);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const onSubmitName = () => {
        if (name) {
            window.localStorage.setItem("name", name);
            setModalOpen(false);
            set(ref(database, thisUserDbPath), {
                name,
                selectedOption: -1,
            });
        }
    };

    const onRemove = (uuid: string) => {
        remove(ref(database, usersDbPath + uuid));
    }

    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        remove(ref(database, thisUserDbPath));

        get(ref(database, usersDbPath)).then((snapshot) => {
            if (!snapshot.exists()) {
                remove(ref(database, stateDbPath));
            }
        });
    });

    React.useEffect(() => {
        // Enable SUDO mode on alt button down
        document.body.addEventListener('keydown', (event) => {
            setSudoMode(event.altKey);
        });
        document.body.addEventListener('keyup', (event) => {
            setSudoMode(event.altKey);
        });
    }, []);

    const userList: User[] = Object.keys(users).map(key => users[key]);
    const selectedUser = userList.filter(x => x.selectedOption !== -1);
    const averageEsimation = getAverageFromResult(selectedUser);
    const pokerOptions = getPokerOptions(pokerMode);
    const majorityOptions = getMajorityFromResult(selectedUser, pokerOptions);

    const handleExtraFn = () => {
        window.open(`${window.location.origin}/c/${roomName}`, '_blank', 'height=200,width=520');
    };

    const optionButtons = (
        <OptionButtonGroup
            pokerMode={pokerMode}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            appState={appState}
            onOptionSelect={onOptionSelect}
            visibility={visibility}
            setVisibility={setVisibility}
            enableExtraFn={true}
            handleExtraFn={handleExtraFn}
        />
    );

    const getButtonContent = () => {
        switch (appState) {
            case AppState.Init:
                return `Reveal cards (${selectedUser.length} of ${userList.length} voted)`;
            case AppState.Revealed:
            default:
                return "Next round";
        }
    };

    const getButtonColor = () => {
        return appState === AppState.Init ? 'primary' : 'secondary'
    };

    const onButtonClick = () => {
        if (appState === AppState.Init) {
            onAppStateUpdate(AppState.Revealed);
        } else {
            onAppStateUpdate(AppState.Init);
            resetAppState();
        }
    };

    const commandButton = (
        <CommandButton
            content={getButtonContent()}
            color={getButtonColor()}
            onClick={onButtonClick}
            resetAppState={resetAppState}
        />
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-1 flex-col items-center gap-5 px-4 py-5 sm:px-8">
                    <div className="flex flex-1 items-center">
                        <LoadingSkeleton count={3} />
                    </div>
                    <div className="h-[52px] w-full max-w-2xl rounded-lg bg-muted animate-pulse" />
                </div>
            );
        }

        if (connectionError) {
            return (
                <div className="flex flex-1 flex-col items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        <p className="text-xl font-semibold mb-2">Can't connect right now</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Check your internet connection and try again.
                        </p>
                        <CommandButton
                            content="Try again"
                            color="primary"
                            onClick={() => window.location.reload()}
                            resetAppState={resetAppState}
                        />
                    </div>
                </div>
            );
        }

        return (
            <main className="flex flex-1 flex-col min-h-0">
                <div className="flex min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
                    <PlayArea
                        appState={appState}
                        uuid={uuid}
                        users={users}
                        showDeleteButton={sudoMode}
                        onRemove={onRemove}
                        majorityOptions={majorityOptions}
                    />
                </div>
                {appState === AppState.Revealed ? (
                    <div className="border-t border-border bg-card p-4 sm:border-0 sm:bg-transparent sm:px-8 sm:pb-6 sm:pt-0">
                        <Result
                            average={averageEsimation}
                            majorityOptions={majorityOptions}
                            options={pokerOptions}
                            votes={selectedUser.map((user) => user.selectedOption)}
                            action={commandButton}
                        />
                    </div>
                ) : (
                    <section
                        aria-label="Your estimate"
                        className="flex flex-col items-center gap-3 border-t border-border bg-card p-4 sm:border-0 sm:bg-transparent sm:px-8 sm:pb-6 sm:pt-0"
                    >
                        {appState === AppState.Init && optionButtons}
                        <div className="w-full max-w-2xl">{commandButton}</div>
                    </section>
                )}
            </main>
        );
    };

    return (
        <>
            <OfflineIndicator />
            <div className="flex h-[100dvh] w-full flex-col bg-background">
                <Header
                    render={
                        <RoomDetail
                            roomName={roomName}
                            onUrlCopied={() => {
                                logEvent(analytics, 'share');
                                toast({
                                    title: "Link copied",
                                    duration: 2000,
                                });
                            }}
                            onOpenSettings={
                                () => setSettingsOpen(true)
                            }
                        />
                    }
                />
                <div className="mx-auto flex min-h-0 w-full max-w-[1120px] flex-1 flex-col">
                    {!modalOpen && renderContent()}
                </div>
                <PopUpModal
                    title={name ? `Hi, ${name}` : "What's your name?"}
                    label="Name"
                    open={modalOpen}
                    value={name}
                    setValue={setName}
                    onSubmit={onSubmitName}
                    onInputChange={(e) => isValidUserName(e.target.value) && setName(e.target.value)}
                />
                <SettingsSidebar
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                    currentPokerMode={pokerMode}
                    onPokerModeSelect={onPokerModeSelect}
                />
            </div>
            <Toaster />
        </>
    );
}

export default InRoom;
