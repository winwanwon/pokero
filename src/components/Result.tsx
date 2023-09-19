import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface Props {
    average: number;
    mode: number;
}

const Result: React.FC<Props> = (props) => {
    const { average, mode } = props;
    return (
        <Box border={1} borderColor="secondary.main" borderRadius={2} px={2} py={1} display="flex">
            <Box mr={2} flex={1}>
                <Typography variant="subtitle2" mb={1}>
                    Average: {!!average ? average.toFixed(1) : "-"}
                </Typography>
                {/* TODO: Update to use max value from available options */}
                <LinearProgress variant="determinate" color="secondary" value={(!!average ? average / 13 : 0) * 100} /> 
            </Box>
            <Box flex={1}>
                <Typography variant="subtitle2" mb={1}>
                    Majority: {mode >= 0 ? mode : "-"}
                </Typography>
                {/* TODO: Update to use max value from available options */}
                <LinearProgress variant="determinate" color="secondary" value={(mode >= 0 ? mode / 13 : 0) * 100} />
            </Box>
        </Box>
    )
}

export default Result;
