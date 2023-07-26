import React, {FC, useId, useState} from 'react';
import {FormControl, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {changeEditionGuideTitle} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {FORM_CONTROL_HEIGHT_PX, H3, OUTLINED, STRING_WITH_SPACE} from "../utils/const";
import {validateText} from "../utils/services";
import {getGuidesTitlesWithGuideIdFilter} from "../services/selectors/guidesSelectors";
import {useParams} from "react-router-dom";

interface IProps {
    guideTitle: string
    isEdit: boolean
    isNewGuide: boolean
    matches_900: boolean
    titleError: string
    setTitleError: (errorText: string) => void
}

const editingText = "Режим редактирования";
const newGuideText = "Новый гайд";
const textFieldLabel = "Заголовок гайда";
const viewingText = "Режим просмотра";

const GuideHeaderTitle: FC<IProps> = ({
                                          guideTitle,
                                          isEdit,
                                          isNewGuide,
                                          matches_900,
                                          titleError,
                                          setTitleError
                                      }) => {
    const dispatch = useAppDispatch()
    const textFieldId = useId()
    const guideId = useParams().guideId || "0";
    const existingGuidesTitles = useAppSelector(state => getGuidesTitlesWithGuideIdFilter(state, guideId))
    const handleGuideNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setTitleError, existingGuidesTitles, 5)
        dispatch(changeEditionGuideTitle(e.target.value))
    }
    return (
        <Stack spacing={1}>
            {isEdit
                ? (<FormControl sx={{minHeight: FORM_CONTROL_HEIGHT_PX}}>
                    <TextField value={guideTitle}
                               onChange={handleGuideNameChange}
                               id={textFieldId}
                               label={textFieldLabel}
                               variant={OUTLINED}
                               fullWidth
                               helperText={titleError}/>
                </FormControl>)
                : (<Typography variant={H3} fontSize={matches_900 ? "37px" : "25px"} fontWeight={800} gutterBottom>
                    {guideTitle}
                </Typography>)}
            <Typography fontSize="12px" fontWeight={400}>
                {!isNewGuide && isEdit && editingText}
                {isNewGuide && newGuideText}
                {!isNewGuide && !isEdit && viewingText}
            </Typography>
        </Stack>
    );
};

export default GuideHeaderTitle;