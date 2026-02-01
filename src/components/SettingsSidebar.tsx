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
                className={`w-full bg-muted rounded-lg p-3 sm:p-6 my-1 text-left border-2 ${
                    id === props.currentPokerMode ? 'border-primary' : 'border-transparent'
                } hover:border-primary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden`}
                onClick={onClick}
                aria-label={`Select ${name} poker mode`}
                aria-pressed={id === props.currentPokerMode}
            >
                <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="font-bold text-foreground text-base sm:text-lg flex-shrink-0">{name}</div>
                    <div className="flex flex-wrap gap-1 max-w-full">
                        {value.map((v) => (
                            <div
                                key={v}
                                className="rounded-full min-w-[24px] h-6 px-2 bg-background text-foreground text-center flex items-center justify-center text-xs font-medium whitespace-nowrap"
                            >
                                {v}
                            </div>
                        ))}
                    </div>
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
                className={`fixed top-0 right-0 h-full w-full max-w-full sm:w-96 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
                    props.open ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-sidebar-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <Settings className="text-primary flex-shrink-0" size={20} />
                        <h2 id="settings-sidebar-title" className="text-lg sm:text-xl font-bold text-foreground truncate">
                            Room Settings
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={props.onClose}
                        className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex-shrink-0 ml-2"
                        aria-label="Close settings"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden h-[calc(100%-64px)] sm:h-[calc(100%-80px)]">
                    <div className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">
                        Poker Mode
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        Choose the estimation scale for your planning poker session
                    </p>
                    {PokerModeOptions.map(renderOptions)}
                </div>
            </div>
        </>
    );
};

export default SettingsSidebar;
