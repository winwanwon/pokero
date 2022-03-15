/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { AppState } from '../enum';
interface OwnProps {
    appState: AppState;
    selectedOption: number;
    setSelectedOption: (option: number) => void;
    onOptionSelect: (option: number) => void;
}

const OptionButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const { selectedOption, setSelectedOption, appState, onOptionSelect } = props;
    const options = [0, 1, 2, 3, 5, 8, 13];

    React.useEffect(() => {
        document.body.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            const keyMap: { [key: string]: number } = {
                '1': 0,
                '2': 1,
                '3': 2,
                '4': 3,
                '5': 4,
                '6': 5,
                '7': 6,
            };
            if (event.key in keyMap) {
                selectOption(options[keyMap[event.key]]);
            }
        });
    }, []);

    const selectOption = (option: number) => {
        const opt = option === selectedOption ? -1 : option;
        setSelectedOption(opt);
        onOptionSelect(opt);
    };

    const renderOptions = options.map((option) => {
        const onClick = () => {
            selectOption(option);
        };
        return (
            <Button
                key={option}
                variant={option === selectedOption ? 'contained' : 'outlined'}
                onClick={onClick}
            >
                {option}
            </Button>
        );
    });

    return (
        <ButtonGroup variant="outlined" size="large" disabled={appState === AppState.Revealed}>
            {renderOptions}
        </ButtonGroup>
    );
}

export default OptionButtonGroup;
