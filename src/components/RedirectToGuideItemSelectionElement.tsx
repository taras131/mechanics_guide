import React, {FC} from 'react';
import {changeNextIdFromNewGuideItem} from "../services/reducers/newGuide";
import {cleanBreadCrumbs, IBreadCrumb} from "../services/reducers/breadCrumbs";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


interface IRedirectSelectionElementProps {
    elementText: string
    elementId: number
    handleToggleOpen: () => void
    currentItemId: number
    lastBreadCrumbs: IBreadCrumb
}

const RedirectToGuideItemSelectionElement: FC<IRedirectSelectionElementProps> = ({
                                                                                     elementText,
                                                                                     elementId,
                                                                                     handleToggleOpen,
                                                                                     currentItemId,
                                                                                     lastBreadCrumbs
                                                                                 }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleResultClick = () => {
        handleToggleOpen()
        navigate(`/new_guide/0`)
        dispatch(changeNextIdFromNewGuideItem({
            prevItemId: lastBreadCrumbs.itemId,
            optionId: lastBreadCrumbs.optionId,
            newNextId: elementId,
            currentItemId: currentItemId
        }))
        dispatch(cleanBreadCrumbs())
    }
    return (
        <Button variant="text" onClick={handleResultClick} fullWidth>
            {elementText}
        </Button>
    );
};

export default RedirectToGuideItemSelectionElement;