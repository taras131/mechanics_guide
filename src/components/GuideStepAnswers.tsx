import React, {FC, useState} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import GuideStepAnswersItem from "./GuideStepAnswersItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";
import {changeEditionGuideOptionText} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import AddNewOption from "./AddNewOption";
import {useNavigate, useParams} from "react-router-dom";
import {getIsEdit} from "../services/selectors/guidesSelectors";
import {addBreadCrumb} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import GuideStepAnswersList from "./GuideStepAnswersList";

interface IGuideStepAnswersProps {
    options: IGuideItemOption []
    questionText: string
    questionId: number
    isEdit: boolean
    guideStepId: number
}

const emptyAnswerMessage = " У вас пока нет вариантов ответа, если вы являетесь автором этого гайда," +
    " перейдите в режим редактирования и нажмите на кнопку \"Добавить\n" +
    "                    вариант ответа\" чтобы добавить новый вариант"

const GuideStepAnswers: FC<IGuideStepAnswersProps> = ({
                                                          options,
                                                          questionText,
                                                          questionId,
                                                          isEdit,
                                                          guideStepId
                                                      }) => {
    const [isOpenNewOptionWindow, setIsOpenNewOptionWindow] = useState(false)
    const toggleIsOpenNewOptionWindow = () => {
        setIsOpenNewOptionWindow(prev => !prev)
    }
    return (
        <Stack spacing={3}>
            <Grid alignItems="center" justifyContent="space-between" container sx={{marginTop: "10px"}}>
                <Grid>
                    <Typography variant="h4" fontSize={14} fontWeight={500}>
                        Варианты ответа:
                    </Typography>
                </Grid>
                <Grid>
                    {isEdit && (
                        <>
                            <Button onClick={toggleIsOpenNewOptionWindow}
                                    variant="contained"
                                    fullWidth
                                    startIcon={<AddCircleOutlineOutlinedIcon/>}>
                                Добавить вариант ответа
                            </Button>
                            <AddNewOption isOpenNewOptionWindow={isOpenNewOptionWindow}
                                          toggleIsOpenNewOptionWindow={toggleIsOpenNewOptionWindow}
                                          guideStepId={guideStepId}/>
                        </>
                    )}
                </Grid>
            </Grid>
            {options.length > 0
                ? (<GuideStepAnswersList options={options}
                                         questionId={questionId}
                                         questionText={questionText}
                                         isEdit={isEdit}/>)
                : (<Typography fontSize={14} fontWeight={300} sx={{paddingTop: "15px"}}>
                    {emptyAnswerMessage}
                </Typography>)}
        </Stack>
    );
};

export default GuideStepAnswers;