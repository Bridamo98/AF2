import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, LinearProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  sendEmailBtn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  bold: {
    fontWeight: 600
  }
}));

const Report = ({ criteria, scores, score, conclusion }) => {
  const classes = useStyles();

  const { t } = useTranslation()

  const initialFormValues = {
    enterpriseName: "",
    email: "",
    formSubmitted: false,
    success: false,
    submitting: false
  };

  const inputFieldValues = [
    {
      name: "enterpriseName",
      label: t("evaluate.thirdStep.report.form.enterpriseName.label"),
      id: "enterprise-name"
    },
    {
      name: "email",
      label: t("evaluate.thirdStep.report.form.email.label"),
      id: "email"
    }
  ];

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [enteredEmail, setEnteredEmail] = useState("");

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("enterpriseName" in fieldValues)
      temp.enterpriseName = fieldValues.enterpriseName ? "" : t("evaluate.thirdStep.report.form.requiredFieldLabel");

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : t("evaluate.thirdStep.report.form.requiredFieldLabel");
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : t("evaluate.thirdStep.report.form.email.notValid");
    }

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true
    });
  };

  const handleError = () => {
    setValues({
      ...values,
      formSubmitted: true,
      success: false
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.enterpriseName &&
      fieldValues.email &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEnteredEmail(values.email);
    setValues({
      ...values,
      formSubmitted: false,
      success: false,
      submitting: true
    });

    const isValid = formIsValid();

    if (isValid) {
      /*fetch("/sendReport", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          enterprise_name: values.enterpriseName,
          criteria: criteria,
          scores: scores,
          score: score,
          conclusion: conclusion
        })
      }).then((response) => {
        if (response.ok) {
          handleSuccess();
        } else {
          handleError();
        }
      }).catch(error => {
        handleError();
        console.error('There was an error!', error);
      });*/
      axios.post(`https://af-back.onrender.com/sendReport`, { // /api/sendReport
        email: values.email,
        enterprise_name: values.enterpriseName,
        criteria: criteria,
        scores: scores,
        score: score,
        conclusion: conclusion
      })
        .then(res => {
          if (res.status === 200) {
            handleSuccess();
          } else {
            console.log(res.ok);
            handleError();
          }
        }).catch(error => {
          handleError();
          console.error('There was an error!', error);
        })
    }
  };

  return (
    <Grid container justify="center" display='flex'>
      <Card style={{ maxWidth: 800 }}>
        <CardHeader title={t("evaluate.thirdStep.report.form.title")} />
        <CardContent>
          <form autoComplete="off" onSubmit={handleFormSubmit}>
            {inputFieldValues.map((inputFieldValue, index) => {
              return (
                <TextField
                  key={index}
                  value={values[inputFieldValue.name]}
                  onChange={handleInputValue}
                  onBlur={handleInputValue}
                  name={inputFieldValue.name}
                  label={inputFieldValue.label}
                  error={errors[inputFieldValue.name]}
                  multiline={inputFieldValue.multiline ?? false}
                  fullWidth
                  rows={inputFieldValue.rows ?? 1}
                  autoComplete="none"
                  {...(errors[inputFieldValue.name] && {
                    error: true,
                    helperText: errors[inputFieldValue.name]
                  })}
                />
              );
            })}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={!formIsValid()}
              className={classes.sendEmailBtn}
            >
              {t("evaluate.thirdStep.report.form.sendReportButtonTitle")}
            </Button>
            <br />
            {values.formSubmitted ?
              (values.success ?
                <>
                  <Typography display="inline">{t("evaluate.thirdStep.report.form.wasSentSuccessful")}</Typography>
                  <Typography display="inline" className={classes.bold}>{enteredEmail}</Typography>
                </>
                : t("evaluate.thirdStep.report.form.cannotSendReport"))
              : (values.submitting ?
                <LinearProgress />
                : null)
            }
          </form >
        </CardContent>
      </Card>
    </Grid>

  );
};

export default Report
