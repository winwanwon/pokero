import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { get, getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { Alert, Box, Container, LinearProgress, Snackbar, Stack, Typography } from "@mui/material";

import { AppState } from "./enum";
import { User, UserDatabase } from "./types";
import { getAverageFromResult, getModeFromResult, isValidRoomName } from "./utils";

import PopUpModal from "./components/PopUpModal";
import OptionButtonGroup from "./components/OptionButtonGroup";
import CommandButtons from "./components/CommandButtons";
import Summary from "./components/Summary";
import { NavBar } from "./components/NavBar";

interface Props {
    firebaseApp: FirebaseApp;
}

const InRoom: React.FC<Props> = (props: Props) => {
    const app = props.firebaseApp;
    const analytics = getAnalytics();
    const database = getDatabase(app);
    const uuid = window.sessionStorage.getItem("uuid") || uuidv4();
    window.sessionStorage.setItem("uuid", uuid);

    const params = useParams();
    const roomName = params.roomName?.toLowerCase() || "";
    const [name, setName] = useState(window.localStorage.getItem("name") || "");
    const [modalOpen, setModalOpen] = useState(true);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [appState, setAppState] = useState<AppState>(AppState.Init);
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    const [users, setUsers] = useState<UserDatabase>({});
    const [sudoMode, setSudoMode] = useState<boolean>(false);
    const usersDbPath = roomName + '/users/';
    const stateDbPath = roomName + '/state/';
    const thisUserDbPath = roomName + '/users/' + uuid;
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
                dbSnap.currentState === AppState.Revealed && setSelectedOption(-1);
            }
        });

        get(ref(database, stateDbPath)).then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(database, stateDbPath), {
                    currentState: AppState.Init,
                });
            } else {
                setAppState(snapshot.val().currentState);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [database, stateDbPath, usersDbPath, uuid]);

    const onOptionSelect = (option: number) => {
        update(ref(database, thisUserDbPath), {
            selectedOption: option,
        });
    };

    const onAppStateUpdate = (appState: AppState) => {
        setAppState(appState);
        update(ref(database, stateDbPath), {
            currentState: appState,
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

    const selectedUserDisplay = (
        <Alert severity={selectedUser.length === userList.length ? 'success' : 'info'}>
            {`${selectedUser.length}/${userList.length} already selected`}
        </Alert>
    );

    const summaryDisplay = (
        <Box border={1} borderColor="secondary.main" borderRadius={2} p={2}>
            <Box mb={2}>
                <Typography variant="subtitle2" mb={1}>
                    Average: {!!averageEsimation ? averageEsimation.toFixed(1) : "-"}
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={(!!averageEsimation ? averageEsimation / 13 : 0) * 100} />
            </Box>
            <Box width="100%">
                <Typography variant="subtitle2" mb={1}>
                    Mode: {modeEstimation >= 0 ? modeEstimation : "-"}
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={(modeEstimation >= 0 ? modeEstimation / 13 : 0) * 100} />
            </Box>
        </Box>
    );

    const optionButtons = (
        <OptionButtonGroup
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            appState={appState}
            onOptionSelect={onOptionSelect}
        />
    );

    const content = (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
            >
                {!modalOpen && <Summary appState={appState} uuid={uuid} users={users} showDeleteButton={sudoMode} onRemove={onRemove} />}
            </Box>
            <Box
                position="absolute"
                bottom={30}
                left={0}
                right={0}
                display="flex"
                justifyContent="center"
            >
                <Stack
                    spacing={2}
                    minWidth={380}
                >
                    {appState === AppState.Init && selectedUserDisplay}
                    {appState === AppState.Revealed && summaryDisplay}
                    {appState === AppState.Init && optionButtons}
                    <CommandButtons
                        appState={appState}
                        onAppStateUpdate={onAppStateUpdate}
                        resetAppState={resetAppState}
                    />
                </Stack>
            </Box>
        </>
    );

    return (
        <>
            <NavBar
                isInRoom={true}
                roomName={roomName}
                onUrlCopied={() => {
                    logEvent(analytics, 'share');
                    setSnackBarOpen(true);
                }}
            />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    height: '100%',
                }}
            >
                <Container sx={{ height: '100%' }}>
                    <PopUpModal
                        title={name ? `Welcome! ${name}` : "Enter your name to proceed"}
                        label="Name"
                        open={modalOpen}
                        value={name}
                        setValue={setName}
                        onSubmit={onSubmitName}
                    />
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={snackBarOpen}
                        autoHideDuration={2000}
                        onClose={() => setSnackBarOpen(false)}
                        message="Invitation URL copied!"
                    />
                    {!modalOpen && content}
                </Container>
            </Box>
        </>
    );
}

export default InRoom;
