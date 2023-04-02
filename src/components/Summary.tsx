import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ClearIcon from '@mui/icons-material/Clear';

import { UserDatabase } from '../types';
import { AppState } from '../enum';

interface OwnProps {
    appState: AppState;
    users: UserDatabase;
    uuid: string;
    showDeleteButton: boolean;
    onRemove: (uuid: string) => void;
}

const Summary: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users, onRemove } = props;

    const userCount = Object.keys(users).length;

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption > -1;
        const isInit = appState === AppState.Init;
        const isRevealed = appState === AppState.Revealed;
        const confirmedValue = selected || isRevealed;

        const removePlayer = () => {
            onRemove(key)
        }

        return (
            <Box
                width={115}
                height={140}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                alignSelf="center"
                justifySelf="center"
                gridColumn="span 1"
                position="relative"
                borderRadius={3}
                boxShadow={3}
                key={key}
                sx={{
                    backgroundColor: 'background.paper',
                    boxShadow: 3,
                }}
            >
                <Box
                    width={60}
                    height={60}
                    border={3}
                    borderColor={confirmedValue ? 'primary.light' : 'secondary.main'}
                    borderRadius={30}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={confirmedValue ? '' : 'animate-pulse'}
                >
                    {isInit && (selected ? <DoneIcon color="primary" sx={{ fontSize: 44 }} /> : <QuestionMarkIcon color="secondary" sx={{ fontSize: 44 }} />)}
                    <Typography
                        color={confirmedValue ? 'primary.main' : 'secondary.main'}
                        fontWeight={500}
                        fontSize={36}
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
                    <Typography
                        fontSize={16}
                        fontWeight={key === uuid ? 600 : 400}
                        textAlign="center"
                        color="text"
                    >
                        {users[key].name}
                    </Typography>
                </Box>
                <Box
                    position="absolute"
                    top={0}
                    right={0}
                >
                    {props.showDeleteButton && key !== uuid && <IconButton component="span" onClick={removePlayer}><ClearIcon /></IconButton>}
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
