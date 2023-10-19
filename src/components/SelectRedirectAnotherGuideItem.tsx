import React, {FC} from "react";
import {IGuide} from "../models/iGuide";
import {ListItemButton, ListItemText} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {editionGuideRedirectAnotherGuide} from "../services/reducers/guides";
import {routes} from "../utils/routes";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useNavigate, useParams} from "react-router-dom";

interface ISelectRedirectAnotherGuideItemProps {
    guide: IGuide
    index: number
    toggleIsOpen: () => void
}

const SelectRedirectAnotherGuideItem: FC<ISelectRedirectAnotherGuideItemProps> = ({guide, index, toggleIsOpen}) => {
    const dispatch = useAppDispatch();
    const guideId = useParams().guideId || "0";
    const lastBreadCrumb = useAppSelector(state => getLastBreadCrumbs(state));
    const navigate = useNavigate();
    const handleAnotherGuideClick = () => {
        if (lastBreadCrumb) {
            dispatch(editionGuideRedirectAnotherGuide({lastBreadCrumb: lastBreadCrumb, redirectAnotherGuide: guide.id}));
            navigate(`${routes.guide}/${guideId}/${lastBreadCrumb?.questionId}`);
            dispatch(removeLastBreadCrumb());
            toggleIsOpen();
        }
    };
    return (
        <ListItemButton onClick={handleAnotherGuideClick}>
            <ListItemText primary={`${index + 1}. ${guide.title}`}/>
        </ListItemButton>
    );
};

export default SelectRedirectAnotherGuideItem;