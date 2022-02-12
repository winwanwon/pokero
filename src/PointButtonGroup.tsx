import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { DatabaseReference, update } from 'firebase/database';

const style = {
    position: 'absolute',
    bottom: '30px',
}

interface OwnProps {
    thisUserRef: DatabaseReference;
}

const PointButtonGroup: React.FC<OwnProps> = (props: OwnProps) => {
    const options = [0, 1, 2, 3, 5, 8, 13]
    const [selectedOption, setSelectedOption] = useState<number>(-1);

    const renderOptions = options.map((option) => {
        const onClick = () => {
            setSelectedOption(option);
            update(props.thisUserRef, {
                selectedOption: option,
            });
        };
        return (
            <Button
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