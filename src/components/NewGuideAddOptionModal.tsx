import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import {Modal, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../hooks/redux";
import {addOption} from "../services/reducers/newGuide";

export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
        dispatch(addOption({id, text: answerText}))
        handleToggleOpen()
        setAnswerText("")
    }
    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={handleToggleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
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
                </Box>
            </Modal>
        </>
    );
};

export default NewGuideAddOptionModal;