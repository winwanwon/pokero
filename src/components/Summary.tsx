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

        const nonSelectedCardStyles = "border-slate-500";
        const selectedCardStyles = "border-teal-400 shadow-teal-500/40";

        const renderStatusMarker = () => {
            if (!selected) {
                return (
                    <div className={`w-2 h-2 rounded-full mx-4 animate-pulse bg-slate-500`}></div>
                );
            }
            return (
                <div className="w-2 h-2 ml-3 mr-5 flex items-center">
                    <DoneIcon color="primary" sx={{ fontSize: 22 }} />
                </div>
            );
        }

        const renderPoint = () => {
            return (
                <div className="w-10 h-2 flex justify-center items-center text-2xl ƒont-extrabold text-teal-600 text-center">
                    {selected ? users[key].selectedOption : "-"}
                </div>
            );
        }

        return (
            <>
                <div className={`min-w-full h-12 border rounded-lg shadow-md bg-white flex items-center ${selected ? selectedCardStyles : nonSelectedCardStyles}`}>
                    {isRevealed ? renderPoint() : renderStatusMarker()}
                    <div className="">
                        {users[key].name}
                    </div>
                </div>
            </>
        );

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
                        fontSize={30}
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
        <div className="w-5/6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {renderAttendees}
        </div>
    );
}

export default Summary;
