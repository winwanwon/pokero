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
        return (
            <TooltipProvider key={index}>
                <Tooltip open={!visibility}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={(option === selectedOption) && visibility ? 'default' : 'outline'}
                            onClick={onClick}
                            disabled={!visibility}
                            className="flex-1"
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
                            size="sm"
                            variant="outline"
                            onClick={onExtraFnClick}
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
