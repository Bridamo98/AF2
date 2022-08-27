import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardActions, Typography, CardHeader, Button, Grid, Paper } from "@material-ui/core";

import iso_logo from "../images/Logo-ISO.png"


const Home = () => {
    const history = useHistory();

    const { t } = useTranslation()

    function handleClick(path) {
        history.push(path);
    }

    return (
        <Grid container justify="center" display='flex'>
            <Paper variant="outlined">
                <img src={iso_logo} alt=""/>
            </Paper>
            <Card style={{ maxWidth: 800 }}>
                <CardHeader title={t("mainPage.mainTitle")} />
                <CardContent>
                    <Typography variant="body2">
                        {t("mainPage.mainText")}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => handleClick("evaluate")}>{t("mainPage.startEvaluationButtonTitle")}</Button>
                </CardActions>
            </Card>
        </Grid>

    )
}

export default Home
