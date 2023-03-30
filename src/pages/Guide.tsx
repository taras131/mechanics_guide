import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {guides} from "../utils/const";
import {IGuide} from "../models/guideInterface";
import Question from "../components/Question";
import Result from "../components/Result";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Guide = () => {
        const {guideId} = useParams();
        const guideData = guides.filter(item => item.id + "" === guideId)[0]
        const [isShowResult, setIsShowResult] = useState(false)
        const [currentQuestion, setCurrentQuestion] = useState(guideData.questions[0])
        const [currentResult, setCurrentResult] = useState({id: 0, text: ""})
        const getQuestionById = (id: number) => {
            return guideData.questions.find((question) => question.id === id);
        }
        const getResultById = (id: number) => {
            return guideData.results.find((result) => result.id === id);
        }
        const handleSelectOption = (nextQuestionId: number) => {
            const nextQuestion = getQuestionById(nextQuestionId);
            if (nextQuestion) {
                setCurrentQuestion(nextQuestion);
            } else {
                const result = getResultById(nextQuestionId)
                if (result) setCurrentResult(result)
                setIsShowResult(true)
            }
        }
        const handleBackClick = () => {
            setCurrentQuestion(guideData.questions[0])
            setIsShowResult(false)
        }
        return (
            <Card>
                <CardContent>
                    <Typography>
                        {guideData.title}
                    </Typography>
                    {isShowResult
                        ? (<Result {...currentResult}/>)
                        : (<Question {...currentQuestion}
                                     handleSelectOption={handleSelectOption}/>)
                    }
                    <Box mt={"50px"}>
                        <Button onClick={handleBackClick}>
                            Начать заново
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        );
    }
;

export default Guide;