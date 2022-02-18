import React from 'react';
import { Button } from '@mui/material';
import { AppState } from '../enum';

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
        <Button variant="contained" color={appState === AppState.Init ? 'primary' : 'secondary'} onClick={onClick}>
            {getButtonContent(appState)}
        </Button>
    )
}

export default CommandButtons;