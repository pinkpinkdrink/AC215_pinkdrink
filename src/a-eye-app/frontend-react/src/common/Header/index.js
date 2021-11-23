import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DataService from "../../services/DataService";
import styles from './styles';

const Header = (props) => {
    const { classes } = props;

    console.log("================================== Header ======================================");


    // State
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        DataService.SetLanguage(options[index])
            .then(function (response) {
                console.log(response.data);
            })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        'English',
        'French',
        'Persian',
        'Chinese',
      ];

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
                        <List
                            component="nav"
                            aria-label="Device settings"
                            sx={{ bgcolor: 'background.paper' }}
                        >
                            <ListItem
                            button
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-controls="lock-menu"
                            aria-label="Language"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickListItem}
                            >
                            <ListItemText
                                disableTypography
                                primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Language</Typography>}
                                secondary={<Typography style={{ color: '#C4C4C4' }}>{options[selectedIndex]}</Typography>}
                            />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                            }}
                        >
                            {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                    </div>


                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);
