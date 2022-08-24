import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Question from './Question';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function Section({ section, questions, options, handleValuesChange }) {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading} component={'span'}>{section[0]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack  spacing={2}>
                    {questions.slice(section[1][0], section[1][1] + 1).map((question, index) => (
                        <Question key={index} question={question} options={options} handleValuesChange={handleValuesChange} />
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default Section
