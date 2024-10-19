import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { Snackbar, Stack } from "@mui/material";

import { AppState, PokerMode } from "../enum";
import { User, UserDatabase } from "../types";
import { getAverageFromResult, getModeFromResult, isValidRoomName, isValidUserName } from "../utils";

import PopUpModal from "../components/PopUpModal";
import OptionButtonGroup from "../components/OptionButtonGroup";
import CommandButton from "../components/CommandButton";
import PlayArea from "../components/PlayArea";
import Result from "../components/Result";
import RoomDetail from "../components/RoomDetail";
import Header from "../components/Header";
import SettingsModal from "../components/SettingsModal";

interface Props {
    firebaseApp: FirebaseApp;
}

const InRoom: React.FC<Props> = (props: Props) => {
    const app = props.firebaseApp;
    const analytics = getAnalytics();
    const database = getDatabase(app);
    const uuid = window.localStorage.getItem("uuid") || uuidv4();
    window.localStorage.setItem("uuid", uuid);

    const params = useParams();
    const roomName = params.roomName?.toLowerCase() || "";
    const [name, setName] = useState(window.localStorage.getItem("name") || "");
    const [modalOpen, setModalOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [appState, setAppState] = useState<AppState>(AppState.Init);
    const [pokerMode, setPokerMode] = useState<PokerMode>(PokerMode.Fibonacci);
    const [selectedOption, setSelectedOption] = useState<number | string>(-1);
    const [users, setUsers] = useState<UserDatabase>({});
    const [sudoMode, setSudoMode] = useState<boolean>(false);
    const [visibility, setVisibility] = useState(true);

    const usersDbPath = roomName + '/users/';
    const stateDbPath = roomName + '/state/';
    const thisUserDbPath = usersDbPath + uuid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidRoomName(roomName)) {
            navigate('/');
        }
    }, [roomName, navigate]);

    useEffect(() => {
        onValue(ref(database, usersDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            if (snapshot.size) {
                setUsers(dbSnap);
                !dbSnap[uuid] && setModalOpen(true);
            }
        });

        onValue(ref(database, stateDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            if (dbSnap) {
                setAppState(dbSnap.currentState);
                setPokerMode(dbSnap.pokerMode);
                dbSnap.currentState === AppState.Revealed && setSelectedOption(-1);
            }
        });

        onValue(ref(database, thisUserDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            setSelectedOption(dbSnap.selectedOption);
        });

        get(ref(database, stateDbPath)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(database, stateDbPath), {
                    currentState: AppState.Init,
                    pokerMode: PokerMode.Fibonacci,
                });
            } else {
                setAppState(snapshot.val().currentState);
                setPokerMode(snapshot.val().pokerMode);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [database, pokerMode, stateDbPath, thisUserDbPath, usersDbPath, uuid]);

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
    const selectedUser = userList.filter(x => x.selectedOption > -1);
    const averageEsimation = getAverageFromResult(selectedUser);
    const modeEstimation = getModeFromResult(selectedUser);

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
                return `Reveal all (${selectedUser.length}/${userList.length} selected)`;
            case AppState.Revealed:
            default:
                return "Reset";
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

    const content = (
        <div className="flex flex-col h-full w-full justify-between items-center">
            <div />
            <PlayArea
                appState={appState}
                uuid={uuid}
                users={users}
                showDeleteButton={sudoMode}
                onRemove={onRemove}
            />
            <Stack
                spacing={1}
                minWidth={420}
            >
                {appState === AppState.Revealed && <Result average={averageEsimation} mode={modeEstimation} />}
                {appState === AppState.Init && optionButtons}
                {/* {appState === AppState.Init && selectedUserDisplay} */}
                <CommandButton
                    content={getButtonContent()}
                    color={getButtonColor()}
                    onClick={onButtonClick}
                    resetAppState={resetAppState}
                />
            </Stack>
        </div>
    );

    return (
        <>
            <Header
                render={
                    <RoomDetail
                        roomName={roomName}
                        onUrlCopied={() => {
                            logEvent(analytics, 'share');
                            setSnackBarOpen(true);
                        }}
                        onOpenSettings={
                            () => setSettingsOpen(true)
                        }
                    />
                }
            />
            <div className="w-full max-w-none h-screen bg-slate-50 pt-20">
                <div className="container mx-auto flex h-full pb-12">
                    {!modalOpen && content}
                </div>
                <PopUpModal
                    title={name ? `Welcome! ${name}` : "Enter your name to proceed"}
                    label="Name"
                    open={modalOpen}
                    value={name}
                    setValue={setName}
                    onSubmit={onSubmitName}
                    onInputChange={(e) => isValidUserName(e.target.value) && setName(e.target.value)}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={snackBarOpen}
                    autoHideDuration={2000}
                    onClose={() => setSnackBarOpen(false)}
                    message="Room URL copied!"
                />
                <SettingsModal
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                    currentPokerMode={pokerMode}
                    onPokerModeSelect={onPokerModeSelect}
                />
            </div>
        </>
    );
}

export default InRoom;
