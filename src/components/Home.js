import { useHistory } from "react-router-dom"
import { Jumbotron, Button, Container } from 'react-bootstrap'
import { useTranslation } from "react-i18next";


const Home = () => {
    const history = useHistory();

    const {t} = useTranslation()

    function handleClick(path) {
        history.push(path);
    }

    return (
        <Jumbotron fluid>
            <Container>
                <h1>{t("mainPage.mainTitle")}</h1>
                <p>
                    {t("mainPage.mainText")}
                </p>
                <Button className="primary" onClick={() => handleClick("evaluate")}>{t("mainPage.startEvaluationButtonTitle")}</Button>
            </Container>
        </Jumbotron>
    )
}

export default Home
