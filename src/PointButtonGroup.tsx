import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { DatabaseReference, update } from 'firebase/database';
import { AppState } from './enum';

const style = {
    position: 'absolute',
    bottom: '30px',
    left: '0',
    right: '0',
    textAlign: 'center',
}

interface OwnProps {
    selectedOption: number;
    setSelectedOption: (option: number) => void;
    appState: AppState;
    thisUserRef: DatabaseReference;
}

const PointButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const { selectedOption, setSelectedOption, appState } = props;
    const options = [0, 1, 2, 3, 5, 8, 13];

    const renderOptions = options.map((option) => {
        const onClick = () => {
            const opt = option === selectedOption ? -1 : option;
            setSelectedOption(opt);
            update(props.thisUserRef, {
                selectedOption: opt,
            });
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
        <Box sx={style}>
            <ButtonGroup variant="outlined" size="large" disabled={appState === AppState.Revealed}>
                {renderOptions}
            </ButtonGroup>
        </Box>
    )
}

export default PointButtonGroup;