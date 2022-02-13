import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { DatabaseReference, onValue } from '@firebase/database';
import { User, UserDatabase } from './types';
import { AppState } from './enum';
import { getAverageFromResult, getModeFromResult } from './utils';

interface OwnProps {
    appState: AppState;
    setAppState: (appState: AppState) => void;
    setSelectedOption: (option: number) => void;
    usersRef: DatabaseReference;
    stateRef: DatabaseReference;
    uuid: string;
}

const PokerTable: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, setAppState, setSelectedOption, usersRef, stateRef, uuid } = props;
    const [users, setUsers] = useState<UserDatabase>({});

    useEffect(() => {
        onValue(usersRef, (snapshot) => {
            const dbSnap = snapshot.val();
            snapshot.size && setUsers(dbSnap);
        });
    }, [usersRef, uuid]);

    useEffect(() => {
        onValue(stateRef, (snapshot) => {
            const dbSnap = snapshot.val();
            setAppState(dbSnap.currentState);
            dbSnap.currentState === AppState.Revealed && setSelectedOption(-1);
        });
    }, [stateRef, setAppState, setSelectedOption]);

    const userList: User[] = Object.keys(users).map(key => users[key]);
    const selectedUser = userList.filter(x => x.selectedOption > -1);
    const averageEsimation = getAverageFromResult(selectedUser);
    const modeEstimation = getModeFromResult(selectedUser);

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption > -1;
        return (
            <Stack key={key} alignItems="center" marginX={2} marginY={2}>
                <Box
                    borderRadius={54}
                    width={108}
                    height={108}
                    border={6}
                    borderColor={selected ? 'primary.main' : 'secondary.main'}
                >
                    <Typography
                        variant="h2"
                        color={selected ? 'primary' : 'secondary'}
                        fontWeight={500}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        {appState === AppState.Init && (selected ? <DoneIcon color="primary" sx={{ fontSize: 90 }} /> : <HourglassEmptyIcon color="secondary" sx={{ fontSize: 72 }} />)}
                        {appState === AppState.Revealed && (selected ? users[key].selectedOption : "-")}
                    </Typography>
                </Box>
                <Typography variant="h5" textAlign="center" marginTop={2}>
                    {users[key].name}
                    {key === uuid && " (You)"}
                </Typography>
            </Stack>
        );
    });

    const selectedUserDisplay = (
        <Alert severity={selectedUser.length === userList.length ? 'success' : 'info'}>
            {`${selectedUser.length}/${userList.length} has already selected`}
        </Alert>
    );

    const summaryDisplay = (
        <Alert variant="filled" severity="success">
            <AlertTitle>
                Result
            </AlertTitle>
            <Box>
                Average: {!!averageEsimation ? averageEsimation : "-"}
            </Box>
            <Box>
                Mode: {modeEstimation}
            </Box>
        </Alert>
    );

    return (
        <>
            <Stack direction="column" spacing={4}>
                <Stack
                    direction="row"
                    justifyContent="center">
                    {renderAttendees}
                </Stack>
                {appState === AppState.Init && selectedUserDisplay}
                {appState === AppState.Revealed && summaryDisplay}
            </Stack>
        </>
    );
}

export default PokerTable;
