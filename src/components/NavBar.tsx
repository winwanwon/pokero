import React from 'react';
import { AppBar, Container, Toolbar, Box } from '@mui/material';

interface Props {
    backgroundColor?: string;
    render?: JSX.Element;
}

const NavBar: React.FC<Props> = (props) => {
    const { render, backgroundColor } = props;

    return (
        <AppBar position="absolute" sx={{ backgroundColor: backgroundColor || 'background.paper', boxShadow: 'none' }}>
            <Container>
                <Toolbar disableGutters>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <a href="/">
                            <img src="/pokero-logo-v2.png" alt="POKERO" height="32" />
                        </a>
                    </Box>
                    {render}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export { NavBar };
