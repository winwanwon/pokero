import React from 'react';
import { Button } from '@mui/material';

interface OwnProps {
    content: string;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    onClick: () => void;
    resetAppState: () => void;
}

const CommandButton: React.FC<OwnProps> = (props: OwnProps) => {
    const { color, content, onClick } = props;

    return (
        <Button variant="contained" color={color} onClick={onClick}>
            {content}
        </Button>
    )
}

export default CommandButton;
