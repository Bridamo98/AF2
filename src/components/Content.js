import React, { useState } from 'react'
import {
    makeStyles
} from '@material-ui/core'
import Navbar from './Navbar'
import Box from './Box'
import { Hidden } from '@material-ui/core'
import { Switch, Route } from 'react-router'
import Home from './Home'
import About from './About'
import Evaluate from './Evaluate'

import iso27001 from "../static/gap_iso_27001 copy.json"

import { useTranslation } from 'react-i18next';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
}))



const Content = () => {
    const classes = styles()

    const [open, setOpen] = useState(false)

    const { i18n } = useTranslation();

    const changeSideMenu = () => {
        setOpen(!open)
    }

    const [language, setLanguage] = useState("en")
    const [options, setOptions] = useState(iso27001.en.options)
    const [criteria, setCriteria] = useState(iso27001.en.critera)
    const [conclusions, setConclusions] = useState(iso27001.en.conclusions)
    const [sections, setSections] = useState(iso27001.en.sections)

    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value)
        i18n.changeLanguage(event.target.value)
        if(event.target.value === 'en') {
            setOptions(iso27001.en.options)
            setCriteria(iso27001.en.critera)
            setConclusions(iso27001.en.conclusions)
            setSections(iso27001.en.sections)
        } else {
            setOptions(iso27001.es.options)
            setCriteria(iso27001.es.criteria)
            setConclusions(iso27001.es.conclusions)
            setSections(iso27001.es.sections)
        }
    };


    return (
        <div className={classes.root}>
            <Navbar changeSideMenu={changeSideMenu} language={language} handleChangeLanguage={handleChangeLanguage}/>
            <Hidden xsDown>
                <Box
                    variant='permanent'
                    open={true}
                />
            </Hidden>
            <Hidden smUp>
                <Box
                    variant='temporary'
                    open={open}
                    onClose={changeSideMenu}
                />
            </Hidden>
            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/evaluate" component={() => <Evaluate options={options} criteria={criteria} conclusions={conclusions} sections={sections}/>} />
                </Switch>
            </div>
        </div>
    )
}

export default Content
