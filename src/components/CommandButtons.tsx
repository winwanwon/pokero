import React from 'react';
import { Box, Button } from '@mui/material';
import { AppState } from '../enum';

const style = {
    position: 'absolute',
    bottom: '100px',
    left: '0',
    right: '0',
    textAlign: 'center',
}

interface OwnProps {
    appState: AppState;
    onAppStateUpdate: (appState: AppState) => void;
    resetAppState: () => void;
}

const CommandButtons: React.FC<OwnProps> = (props: OwnProps) => {
    const { appState, onAppStateUpdate, resetAppState } = props;

    const onClick = () => {
        if (appState === AppState.Init) {
            onAppStateUpdate(AppState.Revealed);
        } else {
            onAppStateUpdate(AppState.Init);
            resetAppState();
        }
    };

    const getButtonContent = (appState: AppState) => {
        switch (appState) {
            case AppState.Init:
                return "Reveal all";
            case AppState.Revealed:
            default:
                return "Reset";
        }
    }

    return (
        <Box sx={style}>
            <Button variant="contained" color="secondary" onClick={onClick}>
                {getButtonContent(appState)}
            </Button>
        </Box>
    )
}

export default CommandButtons;