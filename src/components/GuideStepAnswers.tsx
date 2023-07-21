import React, {FC, useState} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {editionGuideStepAddOption} from "../services/reducers/guides";
import {useAppDispatch} from "../hooks/redux";
import GuideStepAnswersList from "./GuideStepAnswersList";
import AddNewStringValueModal from "./AddNewStringValueModal";
import {ADD_OPTION_LABEL, ADD_OPTION_SUBHEADER_TEXT, ADD_OPTION_TITLE} from "../utils/const";
import {getNextId} from "../utils/services";

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
    const dispatch = useAppDispatch()
    const [isOpenNewOptionWindow, setIsOpenNewOptionWindow] = useState(false)
    const optionsTexts = options.map(option => option.text)
    const toggleIsOpenNewOptionWindow = () => {
        setIsOpenNewOptionWindow(prev => !prev)
    }
    const handleAddOptionClick = (newOptionText: string) => {
        dispatch(editionGuideStepAddOption({
            guideStepId: guideStepId,
            newOption: {
                id: getNextId() - 200,
                nextId: getNextId(),
                text: newOptionText
            }
        }))
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
                            <AddNewStringValueModal
                                existingValues={optionsTexts}
                                fieldLabelText={ADD_OPTION_LABEL}
                                isOpenWindow={isOpenNewOptionWindow}
                                listSubHeaderText={ADD_OPTION_SUBHEADER_TEXT}
                                newValueMinLength={2}
                                onAddNewValueClick={handleAddOptionClick}
                                title={ADD_OPTION_TITLE}
                                toggleIsOpenWindow={toggleIsOpenNewOptionWindow}/>
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