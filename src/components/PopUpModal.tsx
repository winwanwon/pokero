import React from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { isValidUserName } from "../utils";

interface OwnProps {
    title: string;
    label: string;
    open: boolean;
    value: string;
    onSubmit: () => void;
    onClose?: () => void;
    setValue?: (s: string) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PopUpModal: React.FC<OwnProps> = (props: OwnProps) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue && isValidUserName(e.target.value) && props.setValue(e.target.value);
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onSubmit();
        }
    };

    return (
        <Container maxWidth="xs">
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2} justifyContent={'center'}>
                        <Typography variant="h5" gutterBottom component="div">
                            {props.title}
                        </Typography>
                        <TextField label={props.label} variant="filled" onChange={onInputChange} onKeyPress={onKeyPress} value={props.value} autoFocus={true} />
                        <Button variant="contained" onClick={props.onSubmit} disabled={!props.value}>Enter</Button>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    );
}

export default PopUpModal;
