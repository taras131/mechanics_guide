import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import NewGuideItem from "../components/NewGuideItem";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import BreadCrumbs from "../components/BreadCrumbs";
import NewGuideHeader from "../components/NewGuideHeader";
import NewGuideDescription from "../components/NewGuideDescription";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const itemId = useParams().itemId || 0;
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    useEffect(() => {
        dispatch(cleanBreadCrumbs())
    }, [dispatch])
    return (
        <Stack spacing={2}>
            <NewGuideHeader/>
            <NewGuideDescription/>
            {bredCrumbs && bredCrumbs.length > 0 && (<BreadCrumbs/>)}
            <NewGuideItem id={+itemId}/>
        </Stack>
    );
};

export default NewGuide;