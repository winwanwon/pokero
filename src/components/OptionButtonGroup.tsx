/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button, ButtonGroup, Tooltip, Zoom } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { keyMap } from '../constants/keyMap';
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
    const [visibility, setVisibility] = useState(true);

    React.useEffect(() => {
        document.body.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.key in keyMap) {
                selectOption(options[keyMap[event.key]]);
            }
        });
    }, []);

    const selectOption = (option: number) => {
        const opt = option === selectedOption ? -1 : option;
        setSelectedOption(opt);
        onOptionSelect(opt);
    };

    const renderOptions = options.map((option, index) => {
        const onClick = () => {
            selectOption(option);
        };
        return (
            <Tooltip
                title={index + 1}
                placement="top"
                open={!visibility}
                TransitionComponent={Zoom}
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <Button
                    key={option}
                    variant={(option === selectedOption) && visibility ? 'contained' : 'outlined'}
                    onClick={onClick}
                    disabled={!visibility}
                >
                    {option}
                </Button>
            </Tooltip>
        );
    });

    const onToggleVisibility = () => setVisibility(!visibility);

    return (
        <>
            <ButtonGroup variant="outlined" size="large" disabled={appState === AppState.Revealed}>
                {renderOptions}
                <Tooltip title={`${visibility ? 'Enable' : 'Disable'} Facilitator Mode`} placement="right">
                    <Button
                        size="small"
                        onClick={onToggleVisibility}
                    >
                        {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </>
    );
}

export default OptionButtonGroup;
