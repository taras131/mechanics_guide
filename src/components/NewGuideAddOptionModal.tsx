import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import {Modal, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../hooks/redux";
import {addOption} from "../services/reducers/newGuide";

const style = {
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
}

const NewGuideAddOptionModal: FC<INewGuideAddOptionModalProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [answerText, setAnswerText] = useState("")
    const handleToggleOpen = () => {
        setIsOpenModal(prev => !prev)
    }
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
            <Button onClick={handleToggleOpen}
                    variant="contained"
                    sx={{marginTop: "20px"}}>
                Добавить вариант
            </Button>
            <Modal
                open={isOpenModal}
                onClose={handleToggleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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