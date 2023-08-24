import React, {FC, useEffect, useId, useState} from 'react';
import Button from "@mui/material/Button";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddNewStringValueModalList from "./AddNewStringValueModalList";
import ModalWindow from "./ModalWindow";
import {validateText} from "../utils/services";
import {
    ADD_BUTTON_TEXT,
    CENTER, EMPTY_EXISTING_VALUES_TEXT, FORM_CONTROL_HEIGHT_PX, H3,
    OUTLINED, STRING_EMPTY, STRING_WITH_SPACE
} from "../utils/const";
import {fontSizePx} from "../utils/stylesConst";

interface IProps {
    existingValues: string []
    fieldLabelText: string
    isOpenWindow: boolean
    listSubHeaderText: string
    newValueMinLength?: number
    onAddNewValueClick: (newValue: string) => void
    title: string
    toggleIsOpenWindow: () => void
}

const AddNewStringValueModal: FC<IProps> = ({
                                                              existingValues,
                                                              fieldLabelText,
                                                              isOpenWindow,
                                                              listSubHeaderText,
                                                              newValueMinLength = 3,
                                                              onAddNewValueClick,
                                                              title,
                                                              toggleIsOpenWindow,
                                                          }) => {
    const textFieldId = useId()
    const [textFieldError, setTextFieldError] = useState(STRING_WITH_SPACE)
    const [textFieldValue, setTextFieldValue] = useState(STRING_EMPTY)
    useEffect(() => {
        setTextFieldError(STRING_WITH_SPACE)
        setTextFieldValue(STRING_EMPTY)
    }, [setTextFieldError, setTextFieldValue, isOpenWindow])
    const handleAddClick = () => {
        onAddNewValueClick(textFieldValue)
        toggleIsOpenWindow()
    }
    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setTextFieldError, existingValues, newValueMinLength)
        setTextFieldValue(e.target.value)
    }
    return (
        <ModalWindow handleToggleOpen={toggleIsOpenWindow} isOpenModal={isOpenWindow}>
            <Stack spacing={2}>
                <Typography align={CENTER} fontSize={fontSizePx.large} fontWeight={600} variant={H3}>
                    {title}
                </Typography>
                {existingValues.length
                    ? (<AddNewStringValueModalList existingValues={existingValues}
                                                   listSubHeaderText={listSubHeaderText}/>)
                    : (<Typography fontSize={fontSizePx.standard} sx={{padding: 2}}>
                        {EMPTY_EXISTING_VALUES_TEXT}
                    </Typography>)}
                <FormControl sx={{minHeight: FORM_CONTROL_HEIGHT_PX}}>
                    <TextField helperText={textFieldError}
                               id={textFieldId}
                               label={fieldLabelText}
                               onChange={handleCategoryNameChange}
                               value={textFieldValue}
                               variant={OUTLINED}/>
                </FormControl>
                <Button disabled={!!textFieldError} onClick={handleAddClick}>
                    {ADD_BUTTON_TEXT}
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default AddNewStringValueModal;