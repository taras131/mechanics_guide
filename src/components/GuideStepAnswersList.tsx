import React, {FC} from 'react';
import {changeEditionGuideOptionText, editionGuideStepRemoveOption, setGuideMode} from "../services/reducers/guides";
import {addBreadCrumb, cleanBreadCrumbs} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import {IGuideItemOption} from "../models/iGuide";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import GuideStepAnswersItem from "./GuideStepAnswersItem";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import {CENTER, GUIDE_MODE, ROW} from "../utils/const";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import RedoIcon from '@mui/icons-material/Redo';
import Box from "@mui/material/Box";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";


interface IGuideStepAnswersListProps {
    options: IGuideItemOption []
    questionId: number
    questionText: string
    isEdit: boolean
}

const GuideStepAnswersList: FC<IGuideStepAnswersListProps> = ({
                                                                  options,
                                                                  questionId,
                                                                  questionText,
                                                                  isEdit
                                                              }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const guideId = useParams().guideId || "0";
    const isRedirectToOtherGuide = options.find(option => option.redirectAnotherGuide)
    const isRedirectToOtherGuideBranch = options.find(option => option.id > option.nextId)
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))

    const handleOptionRemove = (guideStepId: number, optionId: number) => {
        dispatch(editionGuideStepRemoveOption({guideStepId, optionId}))
    }
    const handleOptionTextChange = (newValue: string, optionId: number,) => {
        dispatch(changeEditionGuideOptionText({
            guideStepId: questionId,
            optionId: optionId,
            newValue: newValue
        }))
    }
    const handleNextQuestionClick = (optionId: number, optionText: string, nextId: number) => {
        dispatch(addBreadCrumb({
            questionText: questionText,
            answerText: optionText,
            questionId: questionId,
            optionId: optionId,
            nextId: nextId
        }))
        navigate(routes.guide + "/" + guideId + "/" + nextId)
    }
    const handleRedirectGuideClick = (redirectAnotherGuide: string) => {
        navigate(`${routes.guide}/${redirectAnotherGuide}/0`)
        dispatch(setGuideMode(GUIDE_MODE.viewing))
        dispatch(cleanBreadCrumbs())
    }
    const answersList = options.map((option, index) => {
        return GuideStepAnswersItem({
            option: option,
            questionText: questionText,
            questionId: questionId,
            index: index,
            isEdit: isEdit,
            handleOptionTextChange: handleOptionTextChange,
            handleNextQuestionClick: handleNextQuestionClick,
            handleOptionRemove: handleOptionRemove,
            handleRedirectGuideClick: handleRedirectGuideClick,
            breadCrumbs: breadCrumbs
        })
    })
    return (
        <>
            <Grid container spacing={2}>
                {answersList}
            </Grid>
            <Box >
                {isEdit && (<>
                        <Stack direction={ROW} spacing={1} alignItems={CENTER} mt={2}>
                            <DeleteIcon/>
                            <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                Кликнув по корзине вы удалите вариант ответа.
                            </Typography>
                        </Stack>
                        <Stack direction={ROW} spacing={1} alignItems={CENTER} mt={2}>
                            <ArrowForwardIcon/>
                            <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                Кликнув по стрелке вы перейдёте к заполнению следующего этапа.
                            </Typography>
                        </Stack>
                    </>
                )}
                {isRedirectToOtherGuide && (
                    <Stack direction={ROW} spacing={1} alignItems={CENTER} mt={2}>
                        <MergeTypeIcon/>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Ответ отмеченный этим символом перенаправит вас на другой гайд.
                        </Typography>
                    </Stack>
                )}
                {isRedirectToOtherGuideBranch && (
                    <Stack direction={ROW} spacing={1} alignItems={CENTER} mt={2}>
                        <RedoIcon/>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Зтот вариант ответа перенаправит вас на другую ветвь гайда. Обратите внимание,
                            - последовательный выбор одних и тех же ответов приведёт гайд к зацикливанию
                        </Typography>
                    </Stack>
                )}
            </Box>
        </>

    );
};

export default GuideStepAnswersList;