import React from 'react';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { User, UserDatabase } from './types';
import { AppState } from './enum';
import { getAverageFromResult, getModeFromResult } from './utils';

interface OwnProps {
    appState: AppState;
    users: UserDatabase;
    uuid: string;
}

const Summary: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users } = props;

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
                    borderColor={selected ? 'success.light' : 'warning.light'}
                >
                    <Typography
                        variant="h2"
                        color={selected ? 'success.main' : 'warning.main'}
                        fontWeight={500}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        {appState === AppState.Init && (selected ? <DoneIcon color="success" sx={{ fontSize: 90 }} /> : <HourglassEmptyIcon color="warning" sx={{ fontSize: 72 }} />)}
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

export default Summary;
