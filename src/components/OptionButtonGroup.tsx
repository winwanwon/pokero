/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, ChevronUp } from 'lucide-react';

import { keyMap, reverseKeyMap } from '../constants/keyMap';
import { AppState, PokerMode } from '../enum';
import { PokerModeOptions } from '../constants/pokerMode';

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
}

const OptionButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const { pokerMode, selectedOption, setSelectedOption, appState, onOptionSelect, visibility, setVisibility, enableExtraFn, handleExtraFn } = props;
    const options = PokerModeOptions.find(p => p.id === pokerMode)?.value || [0, 1, 2, 3, 5, 8, 13];

    React.useEffect(() => {
        document.body.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.key in keyMap) {
                selectOption(options[keyMap[event.key]]);
            }
        });
    }, []);

    const selectOption = (option: number | string) => {
        const opt = option === selectedOption ? -1 : option;
        setSelectedOption(opt);
        onOptionSelect(opt);
    };

    const renderOptions = options.map((option, index) => {
        const onClick = () => {
            selectOption(option);
        };
        const isSelected = option === selectedOption;
        return (
            <TooltipProvider key={index}>
                <Tooltip open={!visibility}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isSelected && visibility ? 'default' : 'outline'}
                            onClick={onClick}
                            disabled={!visibility}
                            className="flex-1 min-h-[44px] min-w-[44px] border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-base sm:text-sm active:scale-95 transition-transform duration-100"
                            aria-label={`Select ${option} points (keyboard shortcut: ${reverseKeyMap[index]})`}
                            aria-pressed={isSelected}
                        >
                            {option}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Keyboard: {reverseKeyMap[index]}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    });

    const onExtraFnClick = () => {
        setVisibility && setVisibility(false);
        handleExtraFn && handleExtraFn();
    };

    const renderExtraFn = () => {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            onClick={onExtraFnClick}
                            className="min-h-[44px] min-w-[44px] px-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 transition-transform duration-100"
                            aria-label="Open options in new tab"
                        >
                            <ExternalLink size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Open options in new tab</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    const onShowOptions = () => {
        setVisibility && setVisibility(true);
    };

    return visibility ? (
        <div className="flex gap-1 w-full" aria-disabled={appState === AppState.Revealed}>
            {renderOptions}
            {enableExtraFn && renderExtraFn()}
        </div>
    ) : (
        <Button variant="ghost" onClick={onShowOptions}>
            <ChevronUp className="mr-2" size={16} /> Show options
        </Button>
    );
}

export default OptionButtonGroup;
