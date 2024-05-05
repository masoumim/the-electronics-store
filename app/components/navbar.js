// navbar.js - This interactive component contains drop-down menus for each of the product categories
// It uses the AppBar component from MUI to display the navigation bar with the product categories (https://mui.com/material-ui/react-app-bar)

'use client'

import { AppBar, Toolbar, Button, Drawer, IconButton, Hidden, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputer, faGamepad, faPlug, faCamera } from '@fortawesome/free-solid-svg-icons';
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
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Button color="inherit" onClick={handleComputersClick} className='mr-2'>
                    <div className='text-base hidden lg:block'>Computers</div>
                    <FontAwesomeIcon icon={faComputer} className="block lg:hidden" size='3x' />
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
                    <div className='text-base hidden lg:block'>Gaming</div>
                    <FontAwesomeIcon icon={faGamepad} className="block lg:hidden" size='3x' />
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
                    <div className='text-base hidden lg:block'>Home Electronics</div>
                    <FontAwesomeIcon icon={faPlug} className="block lg:hidden" size='3x' />
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
                    <div className='text-base hidden lg:block'>Cameras & Drones</div>
                    <FontAwesomeIcon icon={faCamera} className="block lg:hidden" size='3x' />
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