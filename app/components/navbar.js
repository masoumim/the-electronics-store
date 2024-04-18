// navbar.js - This interactive component contains drop-down menus for each of the product categories

'use client'

import { AppBar, Toolbar, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={handleClick}>
                    Computers
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link href="/computers/desktops">
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Desktops</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/computers/desktops/parts">
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Parts</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/computers/desktops/parts/memory">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>Memory</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/computers/desktops/parts/hdd">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>Hard Disc Drives</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/computers/desktops/parts/cpu">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>CPUs</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/computers/laptops">
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Laptops</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
                {/* Add similar buttons and menus for other categories */}
            </Toolbar>
        </AppBar>
    );
}