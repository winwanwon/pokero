import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';

import { UserDatabase } from '../types';
import { AppState } from '../enum';

interface OwnProps {
    appState: AppState;
    users: UserDatabase;
    uuid: string;
}

const Summary: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users } = props;

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption > -1;
        const isInit = appState === AppState.Init;
        const isRevealed = appState === AppState.Revealed;
        const confirmedValue = selected || isRevealed;

        return (
            <Stack key={key} alignItems="center" marginX={2} marginY={2}>
                <Box
                    width={160}
                    height={220}
                    className="card"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        width={84}
                        height={84}
                        border={4}
                        borderColor={confirmedValue ? 'success.light' : 'primary.main'}
                        borderRadius={42}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {isInit && (selected ? <DoneIcon color="success" sx={{ fontSize: 60 }} /> : <QuestionMarkIcon color="primary" sx={{ fontSize: 60 }} />)}
                        <Typography
                            color={confirmedValue ? 'success.main' : 'primary.main'}
                            fontWeight={500}
                            fontSize={48}
                            textAlign="center"
                        >
                            {isRevealed && (selected ? users[key].selectedOption : "-")}
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginTop={2}
                    >
                        {key === uuid && <PersonIcon color="primary" />}
                        <Typography variant="h6" textAlign="center" color={key === uuid ? 'primary' : 'text'}>
                            {users[key].name}
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        );
    });

    return (
        <>
            <Stack direction="column" spacing={4}>
                <Stack
                    direction="row"
                    justifyContent="center">
                    {renderAttendees}
                </Stack>
            </Stack>
        </>
    );
}

export default Summary;
