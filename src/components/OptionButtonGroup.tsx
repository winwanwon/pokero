/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, ButtonGroup, Tooltip, Zoom } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
            <Tooltip
                title={reverseKeyMap[index]}
                key={index}
                placement="top"
                open={!visibility}
                TransitionComponent={Zoom}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <Button
                    key={option}
                    variant={(option === selectedOption) && visibility ? 'contained' : 'outlined'}
                    onClick={onClick}
                    disabled={!visibility}
                >
                    {option}
                </Button>
            </Tooltip>
        );
    });

    const onExtraFnClick = () => {
        setVisibility && setVisibility(false);
        handleExtraFn && handleExtraFn();
    };

    const renderExtraFn = () => {
        return (
            <Tooltip title="Open options in new tab" placement="right">
                <Button
                    size="small"
                    onClick={onExtraFnClick}
                >
                    <OpenInNewIcon />
                </Button>
            </Tooltip>
        );
    }

    const onShowOptions = () => {
        setVisibility && setVisibility(true);
    };

    return visibility ? (
        <ButtonGroup variant="outlined" size="large" disabled={appState === AppState.Revealed}>
            {renderOptions}
            {enableExtraFn && renderExtraFn()}
        </ButtonGroup>
    ) : (
        <Button variant="text" onClick={onShowOptions}>
            <ExpandLessIcon /> Show options
        </Button>
    );
}

export default OptionButtonGroup;
