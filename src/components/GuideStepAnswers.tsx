import React, {FC, useState} from 'react';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddNewStringValueModal from "./AddNewStringValueModal";
import GuideStepAnswersList from "./GuideStepAnswersList";
import {getNextId} from "../utils/services";
import {editionGuideStepAddOption} from "../services/reducers/guides";
import {useAppDispatch} from "../hooks/redux";
import {IGuideItemOption} from "../models/iGuide";
import {
    ADD_OPTION_LABEL,
    ADD_OPTION_SUBHEADER_TEXT,
    ADD_OPTION_TITLE,
    CENTER,
    EMPTY_GUIDE_ITEM_MESSAGE, H4,
    SPACE_BETWEEN
} from "../utils/const";


interface IGuideStepAnswersProps {
    guideStepId: number
    isEdit: boolean
    options: IGuideItemOption []
    questionId: number
    questionText: string
}

const GuideStepAnswers: FC<IGuideStepAnswersProps> = ({
                                                          guideStepId,
                                                          isEdit,
                                                          options,
                                                          questionId,
                                                          questionText,
                                                      }) => {
    const dispatch = useAppDispatch()
    const [isOpenNewOptionWindow, setIsOpenNewOptionWindow] = useState(false)
    const optionsTexts = options.map(option => option.text)
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
    const toggleIsOpenNewOptionWindow = () => {
        setIsOpenNewOptionWindow(prev => !prev)
    }
    return (
        <Stack spacing={3}>
            <Grid alignItems={CENTER} justifyContent={SPACE_BETWEEN} container sx={{marginTop: "10px"}}>
                <Grid>
                    <Typography variant={H4} fontSize={14} fontWeight={500}>
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
                    {EMPTY_GUIDE_ITEM_MESSAGE}
                </Typography>)}
        </Stack>
    );
};

export default GuideStepAnswers;