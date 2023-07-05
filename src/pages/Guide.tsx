import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById, getGuideStepById} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs"
import GuideHeader from "../components/GuideHeader";
import GuideStep from "../components/GuideStep";

const Guide = () => {
        const guideId = useParams().guideId || "0";
        const guideStepId = useParams().stepId || "0";
        const guide = useAppSelector(state => getGuideById(state, guideId))
        const guideStep = useAppSelector(state => getGuideStepById(state, guideId, +guideStepId))
        const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
        const dispatch = useAppDispatch()
        useEffect(() => {
            dispatch(cleanBreadCrumbs())
        }, [dispatch])
        return (
            <Stack spacing={2}>
                <GuideHeader {...guide}/>
                <BreadCrumbs/>
                <GuideStep {...guideStep}/>
            </Stack>
        );
    }
;

export default Guide;