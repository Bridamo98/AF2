import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Options } from './Options';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core';
import { Paper } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function Question({ question, options, handleValuesChange }) {
    const classes = useStyles();

    return (
        <Item>
            <div>
            <Typography className={classes.heading} component={'span'}>{question}</Typography>
            <br/>
            <Options options={options} question={question} handleValuesChange={handleValuesChange} />
            </div>
            
        </Item>
    )
}

export default Question
