import React, {FC, useState} from 'react';
import ModalWindow from "./ModalWindow";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../hooks/redux";
import {editionGuideStepAddOption} from "../services/reducers/guides";
import {getNextId} from "../utils/services";
import Stack from "@mui/material/Stack";

interface IAddNewOptionProps {
    isOpenNewOptionWindow: boolean
    toggleIsOpenNewOptionWindow: () => void
    guideStepId: number
}

const AddNewOption: FC<IAddNewOptionProps> = ({
                                                  isOpenNewOptionWindow,
                                                  toggleIsOpenNewOptionWindow,
                                                  guideStepId
                                              }) => {
    const dispatch = useAppDispatch()
    const [newOptionText, setNewOptionText] = useState("")
    const handleNewOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewOptionText(e.target.value)
    }
    const handleAddOptionClick = () => {
        dispatch(editionGuideStepAddOption({
            guideStepId: guideStepId,
            newOption: {
                id: getNextId() - 200,
                nextId: getNextId(),
                text: newOptionText
            }
        }))
        toggleIsOpenNewOptionWindow()
    }
    return (
        <ModalWindow isOpenModal={isOpenNewOptionWindow} handleToggleOpen={toggleIsOpenNewOptionWindow}>
            <Stack spacing={2}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600}>
                    Добавление Варианта ответа
                </Typography>
                <TextField value={newOptionText}
                           onChange={handleNewOptionTextChange}
                           id="outlined-basic"
                           label="Новый вариант ответа"
                           variant="outlined"/>
                <Button onClick={handleAddOptionClick}>Добавить</Button>
            </Stack>
        </ModalWindow>
    );
};

export default AddNewOption;