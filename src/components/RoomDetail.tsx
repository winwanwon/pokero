import React from 'react'
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Typography } from '@mui/material';

interface OwnProps {
    roomName: string;
    onUrlCopied?: () => void;
    onOpenSettings?: () => void;
}

const RoomDetail: React.FC<OwnProps> = (props) => {
    const { roomName, onUrlCopied, onOpenSettings } = props;
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
            <Box display="flex" alignItems="center" mr={1}>
                <TagIcon />
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
                    {roomName}
                </Typography>
            </Box>
            <Box >
                <IconButton sx={{ color: 'primary.main' }} onClick={copyUrl}>
                    <ShareIcon />
                </IconButton>
            </Box>
            <Box>
                <IconButton sx={{ color: 'primary.main' }} onClick={onOpenSettings}>
                    <SettingsIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default RoomDetail;
