import React, {FC} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GuideStepAnswersList from "./GuideStepAnswersList";
import {IGuideItemOption} from "../models/iGuide";

interface IGuideStepAnswersProps {
    guideStepId: number
    isEdit: boolean
    options: IGuideItemOption []
    questionId: number
    questionText: string
}

const emptyAnswersListEditText = "Вариантов ответа пока нет. Нажмите на + ответ , что бы добавить вариант ответа."
const emptyAnswersListText  = "Варианты ответа пока не добавлены, если вы являетесь автором, " +
    "перейдите в режим редактирования для заполнения."

const GuideStepAnswers: FC<IGuideStepAnswersProps> = ({
                                                          guideStepId,
                                                          isEdit,
                                                          options,
                                                          questionId,
                                                          questionText,
                                                      }) => {


    return (
        <Stack spacing={3}>
            {options.length > 0
                ? (<GuideStepAnswersList options={options}
                                         questionId={questionId}
                                         questionText={questionText}
                                         isEdit={isEdit}/>)
                : (<Typography fontSize={14} fontWeight={300} sx={{paddingTop: "15px"}}>
                    {isEdit ? emptyAnswersListEditText : emptyAnswersListText}
                </Typography>)}
        </Stack>
    );
};

export default GuideStepAnswers;