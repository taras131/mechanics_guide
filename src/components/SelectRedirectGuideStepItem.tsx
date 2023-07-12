import React, {FC} from 'react';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import {IGuideItem} from "../models/iGuide";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {editionGuideResultRedirect, removeGuideStep} from "../services/reducers/guides"
import {routes} from "../utils/routes";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useNavigate, useParams} from "react-router-dom";

interface ISelectGuideStepResultItemProps {
    index: number
    guideStep: IGuideItem
    toggleIsOpenSelectRedirectWindow: () => void
}


const SelectRedirectGuideStepItem: FC<ISelectGuideStepResultItemProps> = ({
                                                                              index,
                                                                              guideStep,
                                                                              toggleIsOpenSelectRedirectWindow
                                                                          }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const lastBreadCrumb = useAppSelector(state => getLastBreadCrumbs(state))
    const guideId = useParams().guideId || "0";
    const guideStepId = useParams().stepId || "0";
    const handleResultClick = () => {
        if (lastBreadCrumb) {
            dispatch(editionGuideResultRedirect({lastBreadCrumb: lastBreadCrumb, newNextId: guideStep.id}))
//            dispatch(removeGuideStep(+guideStepId))
            navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumb?.questionId)
            dispatch(removeLastBreadCrumb())
            toggleIsOpenSelectRedirectWindow()
        }
    }
    return (
        <ListItemButton key={guideStep.id} onClick={handleResultClick}>
            <ListItemText primary={`${index + 1}. ${guideStep.text}`}/>
        </ListItemButton>
    );
};

export default SelectRedirectGuideStepItem;