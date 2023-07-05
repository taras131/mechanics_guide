import React, {FC} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import GuideStepAnswer from "./GuideStepAnswer";
import Stack from "@mui/material/Stack";

interface IGuideStepAnswersProps {
    options: IGuideItemOption []
    questionText: string
    questionId: number
}

const GuideStepAnswers: FC<IGuideStepAnswersProps> = ({options, questionText, questionId}) => {
    const answersList = options.map(option => (<GuideStepAnswer key ={option.text}
                                                                option ={option}
                                                                questionText={questionText}
                                                                questionId={questionId}/>))
    return (
        <Stack spacing={2}>
            {answersList}
        </Stack>
    );
};

export default GuideStepAnswers;