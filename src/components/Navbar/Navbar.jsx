import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate } from "react-router-dom";

export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
 
    const handleAddPost = (e) => {
        // handleCloseUserMenu()
        navigate('/add-post')
    }
    const handleHome = (e) => {
        // handleCloseUserMenu()
        navigate('/')
    }
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <MenuItem onClick={(e) => handleHome(e)}>
                        <Typography textAlign="center" > Home</Typography>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleAddPost(e)}>
                        <Typography textAlign="center" > Add Post</Typography>
                    </MenuItem>
                </Toolbar>
            </AppBar>
        </Box>
    );
}