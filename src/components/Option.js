import React from 'react'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Option({option}) {
    return (
        <FormControlLabel value={option} control={<Radio />} label={option} />
    )
}

export default Option
