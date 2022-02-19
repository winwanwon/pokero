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

    const userCount = Object.keys(users).length;

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption > -1;
        const isInit = appState === AppState.Init;
        const isRevealed = appState === AppState.Revealed;
        const confirmedValue = selected || isRevealed;

        return (
            <Box
                width={150}
                height={200}
                className="card"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                alignSelf="center"
                justifySelf="center"
                gridColumn="span 1"
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
        );
    });

    return (
        <>
            <Stack direction="column" spacing={4}>
                <Box display="grid" gridTemplateColumns={`repeat(${userCount <= 6 ? userCount : Math.ceil(userCount / 2)}, ${userCount <= 6 ? 1 : 2}fr)`} gap={2} >
                    {renderAttendees}
                </Box>
            </Stack>
        </>
    );
}

export default Summary;
