import React from 'react';
import { Box } from '@mui/material';
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

const PlayArea: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, uuid, users, onRemove } = props;
    const userCount = Object.keys(users).length;

    const renderAttendees = Object.keys(users).map((key) => {
        const selected = users[key].selectedOption !== -1;
        const isRevealed = appState === AppState.Revealed;
        const confirmedValue = selected || isRevealed;

        const removePlayer = () => {
            onRemove(key)
        }

        const nonSelectedCardStyles = "border-slate-500";
        const selectedCardStyles = "border-teal-400 shadow-teal-500/40";
        const circleBorderStyles = "hidden md:flex w-16 h-16 py-3 border-2 rounded-full justify-center items-center";

        const renderStatusMarker = () => {
            if (!selected) {
                return (
                    <>
                        <div className={`md:hidden w-2 h-2 rounded-full mx-4 animate-pulse bg-slate-500`} />
                        <div className={`${circleBorderStyles} border-slate-500 animate-pulse`}>
                            <QuestionMarkIcon color="secondary" sx={{ fontSize: 44 }} />
                        </div>
                    </>
                );
            }
            return (
                <>
                    <div className="md:hidden w-2 h-2 ml-3 mr-5 flex items-center">
                        <DoneIcon color="primary" sx={{ fontSize: 22 }} />
                    </div>
                    <div className={`${circleBorderStyles} border-teal-500`}>
                        <DoneIcon color="primary" sx={{ fontSize: 44 }} />
                    </div>
                </>
            );
        }

        const renderPoint = () => {
            return (
                <div className="w-10 h-2 md:w-16 md:h-16 flex justify-center items-center text-2xl md:text-3xl ƒont-black text-teal-600 text-center">
                    <div className="md:hidden">
                        {selected ? users[key].selectedOption : "-"}
                    </div>
                    <div className={`${circleBorderStyles} border-teal-500`}>
                        {selected ? users[key].selectedOption : "-"}
                    </div>
                </div>
            );
        }

        return (
            <div key={key} className={`h-12 md:h-32 md:w-28 md:py-3 border rounded-lg shadow-md bg-white flex md:flex-col md:justify-between items-center ${confirmedValue ? selectedCardStyles : nonSelectedCardStyles}`}>
                {isRevealed ? renderPoint() : renderStatusMarker()}
                <div className={`text-slate-900 text-sm ${key === uuid ? 'font-bold' : ''}`}>
                    {users[key].name}
                    {props.showDeleteButton && key !== uuid && <button className="text-red-500" onClick={removePlayer}><ClearIcon sx={{ fontSize: 16 }} /></button>}
                </div>
            </div>
        );
    });

    return (
        <>
            <div className={`md:hidden w-5/6 md:w-auto grid grid-cols-1 gap-2`}>
                {renderAttendees}
            </div>
            <Box className="hidden md:grid" gridTemplateColumns={`repeat(${userCount <= 6 ? userCount : Math.ceil(userCount / 2)}, ${userCount <= 6 ? 1 : 2}fr)`} gap={1} >
                {renderAttendees}
            </Box>
        </>
    );

}

export default PlayArea;
