import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
                        <div key={v} className="rounded-full min-w-[6] h-6 p-1 bg-slate-300 text-center align-middle mr-1 text-xs font-medium">
                            {v}
                        </div>
                    ))}
                </div>
            </button>
        );
    };

    return (
        <Dialog open={props.open} onOpenChange={props.onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Room Settings</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="text-lg font-semibold mb-3">
                        Poker Mode
                    </div>
                    {PokerModeOptions.map(renderOptions)}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SettingsModal;
