import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Question from './Question';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Stack } from '@mui/material';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    AccordionSummary: {
        background: '#AAAAAA',
    },
    section: {
        background: '#e8eaf6',
    },
}));

function Section({ section, questions, options, handleValuesChange }) {
    const classes = useStyles();

    return (
        <>  
            <br/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.AccordionSummary}
                >
                    <Typography className={classes.heading} component={'span'}>{section[0]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justify="center" className={classes.section}>
                        <Stack spacing={2}>
                            {questions.slice(section[1][0], section[1][1] + 1).map((question, index) => (
                                <Question key={index} question={question} options={options} handleValuesChange={handleValuesChange} />
                            ))}
                        </Stack>
                    </Grid>

                </AccordionDetails>
            </Accordion>
        </>

    )
}

export default Section
