import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FirebaseApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { Box, Stack, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

import { AppState, PokerMode } from "../enum";
import { isValidRoomName } from "../utils";

import OptionButtonGroup from "../components/OptionButtonGroup";

interface Props {
    firebaseApp: FirebaseApp;
}

const Control: React.FC<Props> = (props: Props) => {
    const app = props.firebaseApp;
    const database = getDatabase(app);
    const uuid = window.localStorage.getItem("uuid")
    const name = window.localStorage.getItem("name")

    const params = useParams();
    const roomName = params.roomName?.toLowerCase() || "";
    const [appState, setAppState] = useState<AppState>(AppState.Init);
    const [pokerMode, setPokerMode] = useState<PokerMode>(PokerMode.Fibonacci);
    const [selectedOption, setSelectedOption] = useState<number | string>(-1);
    const stateDbPath = roomName + '/state/';
    const thisUserDbPath = roomName + '/users/' + uuid;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidRoomName(roomName) || !uuid) {
            navigate('/');
        }
    }, [roomName, navigate, uuid]);


    useEffect(() => {
        onValue(ref(database, thisUserDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            dbSnap && setSelectedOption(dbSnap.selectedOption);
        });

        onValue(ref(database, stateDbPath), (snapshot) => {
            const dbSnap = snapshot.val();
            dbSnap && setAppState(dbSnap.currentState);
            dbSnap && setPokerMode(dbSnap.pokerMode || PokerMode.Fibonacci);
        });
    }, [database, stateDbPath, thisUserDbPath]);

    const onOptionSelect = (option: number | string) => {
        update(ref(database, thisUserDbPath), {
            selectedOption: option,
        });
    };

    const optionButtons = (
        <OptionButtonGroup
            pokerMode={pokerMode}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            appState={appState}
            onOptionSelect={onOptionSelect}
            visibility={true}
        />
    );

    const renderWaitMessage = () => {
        return (
            <Typography>
                Options will be available once the points get reset.
            </Typography>
        )
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <Stack
                spacing={2}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <InfoIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" ml={1}>Selecting an option for</Typography>
                    <Typography variant="caption" fontWeight={600}>&nbsp; {name}</Typography>
                </Box>
                {appState === AppState.Init && optionButtons}
                {appState === AppState.Revealed && renderWaitMessage()}
            </Stack>
        </div>
    );
}

export default Control;
