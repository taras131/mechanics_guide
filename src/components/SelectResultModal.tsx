import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getNewGuideResultItems} from "../services/selectors/newGuideSelectors";
import {modalStyle} from "./NewGuideAddOptionModal";
import {changeNextIdFromNewGuideItem} from "../services/reducers/newGuide";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {useNavigate, useParams} from "react-router-dom";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs"

const SelectResultModal = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const itemId = useParams().itemId || 0;
    const [isOpenModal, setIsOpenModal] = useState(false)
    const results = useAppSelector(state => getNewGuideResultItems(state))
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state))
    const handleToggleOpen = () => {
        setIsOpenModal(prev => !prev)
    }
    let resultsList: any = []
    if (!lastBreadCrumbs) {
        return (<div>Пока нет результатов</div>)
    }
    if (results.length > 0) {
        resultsList = results.map(item => {
            console.log(item)
            const handleResultClick = () => {
                handleToggleOpen()
                navigate(`/new_guide/0`)
                console.log(item.id)
                dispatch(changeNextIdFromNewGuideItem({
                    itemId: lastBreadCrumbs.itemId,
                    optionId: lastBreadCrumbs.optionId,
                    newNextId: item.id,
                    currentItemId: +itemId
                }))
                dispatch(cleanBreadCrumbs())
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