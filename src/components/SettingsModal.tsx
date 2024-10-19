import React from "react";
import { Modal } from "@mui/material";
import { Container } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { PokerMode } from "../enum";
import { PokerModeOptions } from "../constants/pokerMode";


interface OwnProps {
    open: boolean;
    onClose: () => void;
    currentPokerMode: PokerMode;
    onPokerModeSelect: (p: PokerMode) => void;
}

interface OptionProps {
    id: PokerMode,
    name: string;
    desc?: string;
    value: number[] | string[];
}

const SettingsModal: React.FC<OwnProps> = (props: OwnProps) => {
    const renderOptions = (optionProps: OptionProps) => {
        const { id, name, value } = optionProps;
        const onClick = () => {
            props.onPokerModeSelect(id);
        };
        return (
            <button
                key={id}
                className={`w-full bg-slate-200 rounded-lg p-6 my-1 text-left border-2 flex ${id === props.currentPokerMode ? 'border-teal-400' : ''} items-center justify-between`}
                onClick={onClick}
            >
                <div className="font-bold">
                    {name}
                </div>
                <div className="flex">
                    {value.map((v) => (
                        <div className="rounded-full min-w-[6] h-6 p-1 bg-slate-300 text-center align-middle mr-1 text-xs font-medium">
                            {v}
                        </div>
                    ))}
                </div>
            </button>
        );
    };

    return (
        <Container maxWidth="xs" >
            <Modal
                open={props.open}
                onClose={props.onClose}
                onBackdropClick={props.onClose}
            >
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-slate-50 w-4/5 max-w-xl rounded-lg p-8">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-bold text-2xl">
                                Room Settings
                            </div>
                            <button onClick={props.onClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="text-xl mb-2">
                            Poker Mode
                        </div>
                        {PokerModeOptions.map(renderOptions)}
                    </div>
                </div>
            </Modal>
        </Container>
    );
}

export default SettingsModal;
