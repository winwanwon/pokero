import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
    title: string;
    content: string;
    chipContent?: string;
    chipVariant?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    icon: JSX.Element;
}

const FeatureBox: React.FC<Props> = (props: Props) => (
    <Grid item md={4} px={4} py={6}>
        <Box
            p={1}
            my={2}
            sx={{ backgroundColor: 'primary.main' }}
            width={56}
            height={56}
            borderRadius={23}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {props.icon}
        </Box>
        <Stack spacing={1} direction="row">
            <Typography mb={1} variant="h5">
                {props.title}
            </Typography>
            {props.chipContent && <Chip label={props.chipContent} color={props.chipVariant || 'info'} size="small" />}
        </Stack>
        <Typography variant="body1">
            {props.content}
        </Typography>
    </Grid>
);

export { FeatureBox };