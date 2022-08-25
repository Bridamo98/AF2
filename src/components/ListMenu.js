import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core"

import { Link } from 'react-router-dom'

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import HomeIcon from '@material-ui/icons/Home'
import { useTranslation } from 'react-i18next'

const ListMenu = ( ) => {

    const {t} = useTranslation()

    return (
        <List component="nav">
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                    {t("listMenu.home")}
                </ListItemText>
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/Evaluate">
                <ListItemIcon>
                    <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText>
                    {t("listMenu.takeEval")}
                </ListItemText>
            </ListItem>
            <Divider />
            {/* <ListItem button component={Link} to="/About">
                <ListItemIcon>
                    <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                {t("listMenu.whoWeAre")}
                </ListItemText>
                </ListItem>
                <Divider />*/}
        </List>
    )
}

export default ListMenu
