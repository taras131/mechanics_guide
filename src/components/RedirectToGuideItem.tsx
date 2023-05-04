import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import {useAppSelector} from "../hooks/redux";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {useParams} from "react-router-dom";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {getNewGuideItemsByType} from "../services/selectors/newGuideSelectors";
import ModalWindow from "./modalWindow";
import RedirectToGuideItemSelectionElement from "./RedirectToGuideItemSelectionElement";

interface IRedirectToGuideItemProps {
    type: typeof GUIDE_ITEM_TYPE.result | typeof GUIDE_ITEM_TYPE.question
}

const RedirectToGuideItem: FC<IRedirectToGuideItemProps> = ({type}) => {
    const currentItemId = useParams().itemId || 0;
    const [isOpenModal, setIsOpenModal] = useState(false)
    const results = useAppSelector(state => getNewGuideItemsByType(state, type))
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state))
    const handleToggleOpen = () => {
        setIsOpenModal(prev => !prev)
    }
    let resultsList: any = []
    if (results.length > 0 && lastBreadCrumbs) {
        resultsList = results.map(item => (<RedirectToGuideItemSelectionElement key={item.id}
                                                                                elementText={item.text}
                                                                                elementId={item.id}
                                                                                currentItemId={+currentItemId}
                                                                                lastBreadCrumbs={lastBreadCrumbs}
                                                                                handleToggleOpen={handleToggleOpen}/>))
    }
    return (
        <>
            <Button onClick={handleToggleOpen}
                    variant="outlined"
                    sx={{width: "220px"}}
                    disabled={!lastBreadCrumbs}>
                {type === GUIDE_ITEM_TYPE.result
                    ? "Выбрать результат"
                    : "Перенаправить"
                }
            </Button>
            <ModalWindow
                isOpenModal={isOpenModal}
                handleToggleOpen={handleToggleOpen}
            >
                {resultsList.length > 0
                    ? resultsList
                    : "Пока нет готовых элементов"}
            </ModalWindow>
        </>
    );
};

export default RedirectToGuideItem;