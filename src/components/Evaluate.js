import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Questionnaire from './Questionnaire';
import Result from './Result';
import Report from './Report';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  nextButton: {
    marginTop: theme.spacing(1),
  },
  restartButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(7),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  grid: {
    marginTop: theme.spacing(1),
  },
  form: {
    textAlign: 'center',
  },
}));



const Evaluate = ({ options, criteria, conclusions, sections }) => {

  const maxScore = 9.0;

  const minValue = 10.0;

  const classes = useStyles();

  const { t } = useTranslation()

  const initValues = (questions) => {
    return questions.reduce((o, key) => ({ ...o, [key]: minValue }), {});
  };

  const [values, setValues] = React.useState(initValues(criteria));
  const [activeStep, setActiveStep] = React.useState(0);
  const [score, setScore] = React.useState(minValue);
  const [scores, setScores] = React.useState(Object.values(values));
  const [scoresPerSection, setScoresPerSection] = React.useState(Array(sections.length))
  const [open, setOpen] = React.useState(false);
  const [conclusion, setConclusion] = React.useState("");

  const steps = getSteps();

  const calcScorePerSection = useCallback(
    () => {
      return sections.map(section =>
        Number((scores.slice(section[1][0], section[1][1] + 1).reduce((a, b) => a + b, 0) / scores.slice(section[1][0], section[1][1] + 1).map((score) => score === 0.0 ? 0 : 1).reduce((a, b) => a + b, 0)).toFixed(2))
      )
    },
    [scores, sections],
  );

  const calcScore = useCallback(
    () => {
      const sum = scoresPerSection.reduce((a, b) => a + b, 0);
      const avg = (sum / scoresPerSection.length) || 0;
      return Number(avg.toFixed(2))
    },
    [scoresPerSection],
  );

  const resolveConclusion = useCallback(
    () => {
      var index = null
      Object.values(conclusions).forEach((elem, i) => {
        if (score <= elem && index === null) {
          index = i
        }
      })
      return Object.keys(conclusions)[index]
    },
    [score, conclusions]
  );

  useEffect(() => {
    if (activeStep === 0) {
      setValues(initValues(criteria))
    }
  }, [activeStep, criteria]);

  useEffect(() => {
    setScores(Object.values(values))
  }, [values]);

  useEffect(() => {
    setScoresPerSection(calcScorePerSection())
  }, [scores, calcScorePerSection]);

  useEffect(() => {
    setScore(calcScore())
  }, [scoresPerSection, calcScore]);

  useEffect(() => {
    setConclusion(resolveConclusion())
  }, [score, resolveConclusion]);

  const cantGoToNextStep = () => {
    return !scores.every(el => el !== minValue)
  }

  const handleNext = () => {
    if (activeStep === 0) {
      handleClickOpen()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleValuesChange = (event) => {
    handleChange(event.target.name, event.target.value)
  };

  const handleChange = (question, option) => {
    setValues({
      ...values,
      [question]: options[option]
    });
  };

  function getSteps() {
    return [t("evaluate.firstStep.iconTitle"), t("evaluate.secondStep.iconTitle"), t("evaluate.thirdStep.iconTitle")];
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Questionnaire questions={criteria} options={options} sections={sections} handleValuesChange={handleValuesChange} />;
      case 1:
        return <Result score={score} maxScore={maxScore} conclusion={conclusion} />;
      case 2:
        return <Report criteria={sections.map(el => el[0])} scores={scoresPerSection} score={score} conclusion={conclusion} />;
      default:
        return 'Desconocido';
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeaveQuestionnaire = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setOpen(false);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justify="center" className={classes.grid}>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions} component={'span'}>{t("evaluate.finalStep.finishingText")}</Typography>
              <br />
              <Button variant="contained" color="primary" onClick={handleReset} className={classes.restartButton}>{t("evaluate.finalStep.repeatTestButtonTitle")}</Button>
            </div>
          ) : (
            <div className={classes.form}>
              <Typography className={classes.instructions} component={'span'}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  {t("evaluate.backButtonTitle")}
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext} className={classes.nextButton} disabled={cantGoToNextStep()}>
                  {activeStep === steps.length - 1 ? t("evaluate.finishButtonTitle") : t("evaluate.nextButtonTitle")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("evaluate.firstStep.confirmDialog.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("evaluate.firstStep.confirmDialog.content")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("evaluate.firstStep.confirmDialog.cancelButtonTitle")}</Button>
          <Button onClick={handleLeaveQuestionnaire} autoFocus>
            {t("evaluate.firstStep.confirmDialog.continueButtonTitle")}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Evaluate;
