import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { DatabaseReference, get, set, update } from 'firebase/database';
import { AppState } from './enum';

const style = {
    position: 'absolute',
    bottom: '100px',
    left: '0',
    right: '0',
    textAlign: 'center',
}

interface OwnProps {
    appState: AppState;
    setAppState: (appState: AppState) => void;
    usersRef: DatabaseReference;
    stateRef: DatabaseReference;
}

const CommandButtons: React.FC<OwnProps> = (props: OwnProps) => {
    const { stateRef, usersRef, appState, setAppState } = props;

    useEffect(() => {
        get(stateRef).then((snapshot) => {
            if (!snapshot.exists()) {
                set(stateRef, {
                    currentState: AppState.Init,
                });
            } else {
                setAppState(snapshot.val().currentState);
            }
        }).catch((error) => {
            console.error(error);
        });
    });

    const onClick = () => {
        if (appState === AppState.Init) {
            setAppState(AppState.Revealed);
            update(stateRef, {
                currentState: AppState.Revealed,
            });
        } else {
            setAppState(AppState.Init);
            update(stateRef, {
                currentState: AppState.Init,
            });
            get(usersRef).then((snapshot) => {
                if (snapshot.exists()) {
                    Object.keys(snapshot.val()).forEach((key: string) => {
                        const updates = {} as any;
                        updates['/' + key + '/selectedOption/'] = -1;
                        update(usersRef, updates);
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
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