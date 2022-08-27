import React from 'react'
import {
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'
import ListMenu from './ListMenu'

const styles = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        background: "#CCCCCC",
    },
    toolbar: theme.mixins.toolbar,
}))

const Box = (props) => {
    const classes = styles()
    

    return (
        <Drawer
            className={classes.drawer}
            variant={props.variant}
            classes={{
                paper: classes.drawerPaper
            }}
            open={props.open}
            onClick={props.onClose ? props.onClose : null}//arriba el onClose es igual
            anchor='left'
        >
            <div className={classes.toolbar}></div>
            <Divider/>
            <ListMenu/>
        </Drawer>
    )
}

export default Box
