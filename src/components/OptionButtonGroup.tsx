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

    const renderOptions = options.map((option) => {
        const onClick = () => {
            const opt = option === selectedOption ? -1 : option;
            setSelectedOption(opt);
            onOptionSelect(opt);
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