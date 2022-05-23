import React from 'react'
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';
import { Box, IconButton, Typography } from '@mui/material';

interface OwnProps {
    roomName: string;
    onUrlCopied?: () => void;
}

const RoomDetail: React.FC<OwnProps> = (props) => {
    const { roomName, onUrlCopied } = props;
    const copyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        onUrlCopied && onUrlCopied();
    };

    return (
        <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
                <TagIcon color="primary" />
                <Typography variant="h6" color="primary" sx={{ whiteSpace: 'nowrap' }}>
                    {roomName}
                </Typography>
            </Box>
            <Box mx={2}>
                <IconButton sx={{ color: 'primary.main' }} onClick={copyUrl}>
                    <ShareIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default RoomDetail;
