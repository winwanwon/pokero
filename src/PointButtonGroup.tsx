import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { DatabaseReference, update } from 'firebase/database';

const style = {
    position: 'absolute',
    bottom: '30px',
    left: '0',
    right: '0',
    textAlign: 'center',
}

interface OwnProps {
    thisUserRef: DatabaseReference;
}

const PointButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const options = [0, 1, 2, 3, 5, 8, 13];
    const [selectedOption, setSelectedOption] = useState<number>(-1);

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
            <ButtonGroup variant="outlined" size="large">
                {renderOptions}
            </ButtonGroup>
        </Box>
    )
}

export default PointButtonGroup;