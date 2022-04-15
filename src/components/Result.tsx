import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface Props {
    average: number;
    mode: number;
}

const Result: React.FC<Props> = (props) => {
    const { average, mode } = props;
    return (
        <Box border={1} borderColor="secondary.main" borderRadius={2} p={2}>
            <Box mb={2}>
                <Typography variant="subtitle2" mb={1}>
                    Average: {!!average ? average.toFixed(1) : "-"}
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={(!!average ? average / 13 : 0) * 100} />
            </Box>
            <Box width="100%">
                <Typography variant="subtitle2" mb={1}>
                    Mode: {mode >= 0 ? mode : "-"}
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={(mode >= 0 ? mode / 13 : 0) * 100} />
            </Box>
        </Box>
    )
}

export default Result;
