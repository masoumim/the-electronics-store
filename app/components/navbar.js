// navbar.js - This interactive component contains drop-down menus for each of the product categories

'use client'

import { AppBar, Toolbar, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';

export default function Navbar() {
    const [computersAnchorEl, setComputersAnchorEl] = useState(null);
    const [gamingAnchorEl, setGamingAnchorEl] = useState(null);
    const [homeElectronicsAnchorEl, setHomeElectronicsAnchorEl] = useState(null);
    const [camerasDronesAnchorEl, setCamerasDronesAnchorEl] = useState(null);

    const handleComputersClick = (event) => {
        setComputersAnchorEl(event.currentTarget);
    };

    const handleGamingClick = (event) => {
        setGamingAnchorEl(event.currentTarget);
    };

    const handleHomeElectronicsClick = (event) => {
        setHomeElectronicsAnchorEl(event.currentTarget);
    };

    const handleCamerasDronesClick = (event) => {
        setCamerasDronesAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setComputersAnchorEl(null);
        setGamingAnchorEl(null);
        setHomeElectronicsAnchorEl(null);
        setCamerasDronesAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={handleComputersClick}>
                    Computers
                </Button>
                <Menu
                    anchorEl={computersAnchorEl}
                    open={Boolean(computersAnchorEl)}
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
                    <Link href="/computers/desktops/parts/cpu">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>CPUs</ListItemText>
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
                    <Link href="/computers/laptops">
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Laptops</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
                <Button color="inherit" onClick={handleGamingClick}>
                    Gaming
                </Button>
                <Menu
                    anchorEl={gamingAnchorEl}
                    open={Boolean(gamingAnchorEl)}
                    onClose={handleClose}
                >
                    <Link href="/gaming/consoles" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Consoles</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/consoles/playstation">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>PlayStation</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/consoles/xbox">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>XBox</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/consoles/nintendo">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>Nintendo</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/accessories" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Accessories</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/accessories/headsets">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>Headsets</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/gaming/accessories/controllers">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                            </ListItemIcon>
                            <ListItemText>Controllers</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
                <Button color="inherit" onClick={handleHomeElectronicsClick}>
                    Home Electronics
                </Button>
                <Menu
                    anchorEl={homeElectronicsAnchorEl}
                    open={Boolean(homeElectronicsAnchorEl)}
                    onClose={handleClose}
                >
                    <Link href="/home-electronics/televisions" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Televisions</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/home-electronics/speakers" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Speakers</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/home-electronics/home-security" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Home Security</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/home-electronics/media-streamers" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Media Streamers</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/home-electronics/appliances" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Appliances</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
                <Button color="inherit" onClick={handleCamerasDronesClick}>
                    Cameras & Drones
                </Button>
                <Menu
                    anchorEl={camerasDronesAnchorEl}
                    open={Boolean(camerasDronesAnchorEl)}
                    onClose={handleClose}
                >
                    <Link href="/cameras-drones/drones" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Drones</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/cameras-drones/memory" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Memory</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/cameras-drones/action" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Action Cams</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/cameras-drones/dslr" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>DSLR</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link href="/cameras-drones/point-and-shoot" passHref>
                        <MenuItem onClick={handleClose}>
                            <ListItemText>Point-and-Shoot</ListItemText>
                        </MenuItem>
                    </Link>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}