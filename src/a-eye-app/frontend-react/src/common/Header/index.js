import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';


import styles from './styles';

const Header = (props) => {
    const { classes } = props;

    console.log("================================== Header ======================================");


    // State
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState(null);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open)
    };
    const openSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(event.currentTarget);
    };
    const closeSettingsMenu = (event) => {
        setSettingsMenuAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Toolbar variant="dense">
                    <div><img className={classes.eyeball} src={'eyeball.png'} /></div>
                    <Typography className={classes.appTitle} >
                        A-Eye App
                    </Typography>

                    <div className={classes.grow} />


                    <div>
                        <IconButton color="inherit" component={Link} to="/">
                            <div><img className={classes.settings} src={'settings.png'} /></div>
                        </IconButton>
                        {/* <IconButton color="inherit">
                            <Icon>login</Icon>
                            <Typography variant="caption">&nbsp;Login</Typography>
                        </IconButton> */}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);
