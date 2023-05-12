import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import {Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch} from "../hooks/redux";
import {addOption} from "../services/reducers/newGuide";
import ModalWindow from "./ModalWindow";

interface INewGuideAddOptionModalProps {
    id: number
    isOpenModal: boolean
    handleToggleOpen: () => void
}

const NewGuideAddOptionModal: FC<INewGuideAddOptionModalProps> = ({id, isOpenModal, handleToggleOpen}) => {
    const dispatch = useAppDispatch()
    const [answerText, setAnswerText] = useState("")
    const handleAnswerTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerText(e.target.value)
    }
    const handleAddOptionClick = () => {
        dispatch(addOption({guideId: id, text: answerText}))
        handleToggleOpen()
        setAnswerText("")
    }
    return (
        <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Добавить вариант ответа
            </Typography>
            <TextField fullWidth
                       id="title"
                       name="title"
                       label="Введите ответ"
                       variant="outlined"
                       value={answerText}
                       onChange={handleAnswerTextChange}
                       sx={{marginTop: "20px"}}/>
            <Stack spacing={2} direction="row" mt={"20px"}>
                <Button variant="outlined" onClick={handleToggleOpen}>
                    Отмена
                </Button>
                <Button variant="contained" onClick={handleAddOptionClick}>
                    Добавить
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default NewGuideAddOptionModal;