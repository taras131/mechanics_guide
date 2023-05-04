import React, {useEffect} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import NewGuideItem from "../components/NewGuideItem";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import BreadCrumbs from "../components/BreadCrumbs";
import NewGuideHeader from "../components/NewGuideHeader";
import NewGuideDescription from "../components/NewGuideDescription";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs";
import {setEditionGuide} from "../services/reducers/newGuide";
import {getGuideById} from "../services/selectors/guidesSelectors";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const itemId = useParams().itemId || 0;
    const location: any = useLocation()
    let locationStateGuideId = ""
    if(location.state && location.state.guideId) {
        locationStateGuideId = location.state.guideId
    }
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const editionGuide = useAppSelector(state => getGuideById(state, locationStateGuideId))
    useEffect(() => {
        dispatch(cleanBreadCrumbs())
        if (location.state && location.state.guideId) {
            dispatch(setEditionGuide(editionGuide))
        }
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