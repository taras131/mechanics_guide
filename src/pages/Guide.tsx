import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Card, CardContent, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import GuideHeader from "../components/GuideHeader";
import GuideItem from "../components/GuideItem";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs"

const Guide = () => {
        const guideId = useParams().guideId || "0";
        const guide = useAppSelector(state => getGuideById(state, guideId))
        const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
        const dispatch = useAppDispatch()
        useEffect(() => {
            dispatch(cleanBreadCrumbs())
        }, [dispatch])
        return (
            <Stack spacing={2}>
                <GuideHeader title={guide.title}/>
                {bredCrumbs && bredCrumbs.length > 0 && (<BreadCrumbs/>)}
                <GuideItem guideId={guideId}/>
            </Stack>
        );
    }
;

export default Guide;