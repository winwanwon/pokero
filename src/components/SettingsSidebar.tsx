import React from "react";
import { Button } from "@/components/ui/button";
import { X, Settings } from 'lucide-react';

import { PokerMode } from "../enum";
import { PokerModeOptions } from "../constants/pokerMode";

interface OwnProps {
    open: boolean;
    onClose: () => void;
    currentPokerMode: PokerMode;
    onPokerModeSelect: (p: PokerMode) => void;
}

interface OptionProps {
    id: PokerMode;
    name: string;
    desc?: string;
    value: number[] | string[];
}

const SettingsSidebar: React.FC<OwnProps> = (props: OwnProps) => {
    const renderOptions = (optionProps: OptionProps) => {
        const { id, name, value } = optionProps;
        const onClick = () => {
            props.onPokerModeSelect(id);
        };
        return (
            <button
                key={id}
                className={`w-full bg-muted rounded-lg p-6 my-1 text-left border-2 flex ${
                    id === props.currentPokerMode ? 'border-primary' : 'border-transparent'
                } items-center justify-between hover:border-primary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                onClick={onClick}
                aria-label={`Select ${name} poker mode`}
                aria-pressed={id === props.currentPokerMode}
            >
                <div className="font-bold text-foreground">{name}</div>
                <div className="flex gap-1">
                    {value.map((v) => (
                        <div
                            key={v}
                            className="rounded-full min-w-[24px] h-6 px-2 bg-background text-foreground text-center flex items-center justify-center text-xs font-medium"
                        >
                            {v}
                        </div>
                    ))}
                </div>
            </button>
        );
    };

    return (
        <>
            {/* Overlay */}
            {props.open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={props.onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    props.open ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-sidebar-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <Settings className="text-primary" size={24} />
                        <h2 id="settings-sidebar-title" className="text-xl font-bold text-foreground">
                            Room Settings
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={props.onClose}
                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="Close settings"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
                    <div className="text-lg font-semibold mb-3 text-foreground">
                        Poker Mode
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Choose the estimation scale for your planning poker session
                    </p>
                    {PokerModeOptions.map(renderOptions)}
                </div>
            </div>
        </>
    );
};

export default SettingsSidebar;
