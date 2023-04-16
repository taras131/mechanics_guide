import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Question from "../components/Question";
import Result from "../components/Result";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppSelector} from "../hooks/redux";
import {getGuideById} from "../services/selectors/guidesSelectors";
import {IGuide} from "../models/guideInterface";
import {GUIDE_ITEM_TYPE} from "../utils/const";

const Guide = () => {
        const {guideId} = useParams();
        let id = 0
        if (guideId) id = +guideId
        const guide = useAppSelector(state => getGuideById(state, id))
        const [currentStep, setCurrentStep] = useState(guide.items[0])
        const getGuideItemById = (itemId: number) => {
            return guide.items.filter(item => item.id === itemId)[0]
        }
        const handleSelectOption = (nextQuestionId: number) => {
            const nextGuideItem = getGuideItemById(nextQuestionId);
            setCurrentStep(nextGuideItem)
        }
        const handleBackClick = () => {
            setCurrentStep(guide.items[0])
        }
        return (
            <Card>
                <CardContent>
                    <Typography>
                        {guide.title}
                    </Typography>
                    {currentStep.type === GUIDE_ITEM_TYPE.result
                        ? (<Result {...currentStep}/>)
                        : (<Question {...currentStep}
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