import React, {FC, useEffect} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useNavigate, useParams} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppDispatch} from "../hooks/redux";
import {addBreadCrumb} from "../services/reducers/breadCrumbs";

interface IGuideStepAnswerProps {
    option: IGuideItemOption
    questionText: string
    questionId: number
}

const GuideStepAnswer: FC<IGuideStepAnswerProps> = ({
                                                        option,
                                                        questionText,
                                                        questionId
                                                    }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const guideId = useParams().guideId || "0";
    const handleClick = () => {
        dispatch(addBreadCrumb({
            questionText: questionText,
            answerText: option.text,
            questionId: questionId,
            optionId: option.id,
        }))
        navigate(routes.guide + "/" + guideId + "/" + option.nextId)
    }
    return (
        <Box>
            <Button variant="contained" onClick={handleClick}>
                {option.text}
            </Button>
        </Box>
    );
};

export default GuideStepAnswer;