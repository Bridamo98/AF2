import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactStoreIndicator from 'react-score-indicator'

const Result = ({ score, maxScore, conclusion }) => {

    const { t } = useTranslation()

    return (
        <Grid container justify="center" display='flex'>
            <Card style={{ maxWidth: 800 }}>
                <CardHeader title={t("evaluate.secondStep.result.title")} />
                <CardContent>
                    <div>
                        <br />
                        <Typography display="inline">{t("evaluate.secondStep.result.introduction")}</Typography>
                        <br />
                        <br />
                        <ReactStoreIndicator
                            value={score}
                            maxValue={maxScore}
                        />
                        <br />
                        <Typography display="inline">{conclusion}</Typography>
                        <br />
                        <br />
                    </div>
                </CardContent>
            </Card>
        </Grid>

    )
}

export default Result
