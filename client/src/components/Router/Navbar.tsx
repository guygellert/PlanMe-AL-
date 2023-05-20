import React, { useState } from 'react'
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const menu = [
        {
            path: "/home",
            text: "Home"
        },
        {
            path: "/profile",
            text: "Profile",
        },
        {
            path: "/favoriteMeals",
            text: "Favorites"
        },
        {
            path: "/pref",
            text: "Preffernce"
        }
    ]

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')) {
            return
        }

        setOpenDrawer(open)
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {
                                menu.map((item, index) => (
                                    <Link to={item.path} key={index} style={{ color: "black", textDecoration: "none" }}>
                                        <ListItem key={item.text} disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={item.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                ))
                            }
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </Box >
    )
}

export default Navbar