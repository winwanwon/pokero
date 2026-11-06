/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

import { keyMap, reverseKeyMap } from '../constants/keyMap';
import { AppState, PokerMode } from '../enum';
import { getPokerOptions } from '../constants/pokerMode';

interface OwnProps {
    appState: AppState;
    pokerMode: PokerMode;
    selectedOption: number | string;
    setSelectedOption: (option: number | string) => void;
    onOptionSelect: (option: number | string) => void;
    visibility?: boolean;
    setVisibility?: React.Dispatch<React.SetStateAction<boolean>>;
    enableExtraFn?: boolean;
    handleExtraFn?: () => void;
    compact?: boolean;
}

const OptionButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const { pokerMode, selectedOption, setSelectedOption, appState, onOptionSelect, visibility, setVisibility, enableExtraFn, handleExtraFn, compact } = props;
    const options = getPokerOptions(pokerMode);

    const selectOption = (option: number | string) => {
        const opt = option === selectedOption ? -1 : option;
        setSelectedOption(opt);
        onOptionSelect(opt);
    };

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.repeat) return;
            if (event.key in keyMap) {
                const optionIndex = keyMap[event.key];
                if (optionIndex < options.length) {
                    selectOption(options[optionIndex]);
                }
            }
        };

        document.body.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [options, selectedOption]);

    const hasLongLabel = options.some((option) => String(option).length > 2);
    const cardWidth = () => {
        if (compact) return 'w-12';
        return options.length > 7 ? 'w-[60px]' : 'w-11 sm:w-[60px]';
    };

    const renderOptions = options.map((option, index) => {
        const isSelected = option === selectedOption;
        const stateStyles = isSelected
            ? 'border-primary bg-primary text-primary-foreground sm:-translate-y-1.5'
            : 'border-input bg-card text-card-foreground hover:border-primary';
        return (
            <button
                key={index}
                type="button"
                onClick={() => selectOption(option)}
                className={`relative flex aspect-[5/7] flex-none items-center justify-center rounded-md border font-mono font-semibold shadow-sm transition duration-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${cardWidth()} ${stateStyles} ${hasLongLabel ? 'text-[13px] sm:text-[15px]' : 'text-lg sm:text-xl'}`}
                aria-label={`Vote ${option} (keyboard shortcut: ${reverseKeyMap[index]})`}
                aria-pressed={isSelected}
            >
                {option}
                <span className="absolute bottom-0.5 right-1 hidden text-[11px] font-medium sm:block" aria-hidden="true">
                    {reverseKeyMap[index]}
                </span>
            </button>
        );
    });

    const onExtraFnClick = () => {
        setVisibility && setVisibility(false);
        handleExtraFn && handleExtraFn();
    };

    const onHideOptions = () => {
        setVisibility && setVisibility(false);
    };

    const onShowOptions = () => {
        setVisibility && setVisibility(true);
    };

    return visibility ? (
        <div className="flex w-full flex-col items-center gap-2.5" aria-disabled={appState === AppState.Revealed}>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {renderOptions}
            </div>
            {enableExtraFn && (
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                    <Button
                        variant="ghost"
                        onClick={onHideOptions}
                        className="h-11 px-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        <ChevronDown aria-hidden="true" />
                        Hide my cards
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onExtraFnClick}
                        className="hidden h-11 px-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex"
                    >
                        <ExternalLink aria-hidden="true" />
                        Open cards in a new window
                    </Button>
                </div>
            )}
        </div>
    ) : (
        <Button variant="ghost" className="h-11" onClick={onShowOptions}>
            <ChevronUp aria-hidden="true" /> Show my cards
        </Button>
    );
}

export default OptionButtonGroup;
