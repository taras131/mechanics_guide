import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Modal, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addOption} from "../services/reducers/newGuide";
import {getNewGuideResultItems} from "../services/selectors/newGuideSelectors";
import {IGuideItem} from "../models/newGuideInterface";
import {modalStyle} from "./NewGuideAddOptionModal";
import {changeNextIdFromNewGuideItem} from "../services/reducers/newGuide";

const SelectResultModal = () => {
    const dispatch = useAppDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const results = useAppSelector(state => getNewGuideResultItems(state))
    const handleToggleOpen = () => {
        setIsOpenModal(prev => !prev)
    }
    let resultsList: any = []
    if (results.length > 0) {
        resultsList = results.map(item => {
            const handleResultClick = () => {
                handleToggleOpen()
                //           dispatch(changeNextIdFromNewGuideItem({itemId: 2, newNextId: 4}))
            }
            return (
                <div onClick={handleResultClick}
                     key={item.id}>
                    <Typography sx={{cursor: "pointer"}}>
                        {item.text}
                    </Typography>
                </div>
            )
        })
    }
    return (
        <>
            <Button onClick={handleToggleOpen}
                    variant="contained"
                    sx={{marginTop: "20px"}}>
                Выбрать готовый результат
            </Button>
            <Modal
                open={isOpenModal}
                onClose={handleToggleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {resultsList}
                </Box>
            </Modal>
        </>
    );
};

export default SelectResultModal;