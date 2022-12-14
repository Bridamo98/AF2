import { AppBar, makeStyles, Toolbar, Typography, IconButton, MenuItem } from '@material-ui/core'
import Select from '@mui/material/Select';
import MenuIcon from "@material-ui/icons/Menu"

import React from 'react'

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
        background: "#212121",
    },
    selectLangButtton: {
        background: "#AAAAAA",
    },
}))

const Navbar = (props) => {

    const classes = useStyles()

    return (
         <AppBar position="fixed" className={classes.appBar}>
                    
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={props.changeSideMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Security Test
                </Typography>
                <Select
                    value={props.language}
                    label="Languaje"
                    onChange={props.handleChangeLanguage}
                    className={classes.selectLangButtton}
                >
                    <MenuItem value={"en"}>en-US</MenuItem>
                    <MenuItem value={"es"}>es-ES</MenuItem>
                </Select>
            </Toolbar>

        </AppBar>
    )
}

export default Navbar
