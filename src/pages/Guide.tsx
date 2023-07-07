import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById, getGuideStepById, getIsEdit} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs"
import GuideHeader from "../components/GuideHeader";
import GuideStep from "../components/GuideStep";

const Guide = () => {
        const guideId = useParams().guideId || "0";
        const guideStepId = useParams().stepId || "0";
        const isEdit = useAppSelector(state => getIsEdit(state))
        const guide = useAppSelector(state => getGuideById(state, guideId, isEdit))
        const guideStep = useAppSelector(state => getGuideStepById(state, guideId, +guideStepId, isEdit))
        const dispatch = useAppDispatch()
        useEffect(() => {
            dispatch(cleanBreadCrumbs())
        }, [dispatch])
        return (
            <Stack spacing={2}>
                <GuideHeader guide={guide} isEdit={isEdit}/>
                <BreadCrumbs/>
                <GuideStep guideStep={guideStep} isEdit={isEdit}/>
            </Stack>
        );
    }
;

export default Guide;