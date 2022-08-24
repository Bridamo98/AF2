import { Typography } from '@material-ui/core';
import React from 'react'
import Section from './Section';
import { useTranslation } from 'react-i18next';


const Questionnaire = ({questions, options, sections, handleValuesChange}) => {
    const { t } = useTranslation();
    return (
        <div>
            <Typography display="inline">{t("evaluate.firstStep.questionnaire.introduction")}</Typography>
            <br/>
            <br/>
            {sections.map((section, index) => (
                <Section key={index} section={section} questions={questions} options={Object.keys(options)} handleValuesChange={handleValuesChange}/>
            ))}
            <br/>
        </div>
    );
}

export default Questionnaire
