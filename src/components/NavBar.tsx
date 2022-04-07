import React from 'react';
import { AppBar, Container, Toolbar, Box, IconButton, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';

interface Props {
    backgroundColor?: string;
    isInRoom?: boolean;
    roomName?: string;
    onUrlCopied?: () => void;
}

const NavBar: React.FC<Props> = (props) => {
    const { backgroundColor, isInRoom, roomName, onUrlCopied } = props;

    const copyUrl = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        onUrlCopied && onUrlCopied();
    };

    const roomDetails = (
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

    return (
        <AppBar position="absolute" sx={{ backgroundColor: backgroundColor || 'background.paper', boxShadow: 'none' }}>
            <Container>
                <Toolbar disableGutters>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <a href="/">
                            <img src="/pokero-logo-v2.png" alt="POKERO" height="32" />
                        </a>
                    </Box>
                    {isInRoom && roomDetails}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export { NavBar };
