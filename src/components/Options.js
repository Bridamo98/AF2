import React from 'react'
import Option from './Option';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

export const Options = ({options, question, handleValuesChange}) => {

    return (
        <FormControl component="fieldset">
            <RadioGroup name={question} onChange={handleValuesChange}> 
                {options.map((option, index) => (
                    <Option key={index} option={option}/>
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default Options
