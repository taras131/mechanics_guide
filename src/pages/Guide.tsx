import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById, getGuideStepById, getIsEdit, getIsNewGuide} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import {cleanBreadCrumbs, setBreadCrumbs} from "../services/reducers/breadCrumbs"
import GuideHeader from "../components/GuideHeader";
import GuideStep from "../components/GuideStep";
import {setIsEdit} from "../services/reducers/guides"

const Guide = () => {
        const dispatch = useAppDispatch()
        const guideId = useParams().guideId || "0";
        const guideStepId = useParams().stepId || "0";
        let isNewGuide = useAppSelector(state => getIsNewGuide(state))
        if (isNewGuide) {
            dispatch(setIsEdit(true))
        }
        const isEdit = useAppSelector(state => getIsEdit(state))
        const guide = useAppSelector(state => getGuideById(state, guideId, isEdit, isNewGuide))
        const guideStep = useAppSelector(state => getGuideStepById(state, guideId, +guideStepId, isEdit, isNewGuide))
        const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
        useEffect(() => {
            if (+guideStepId !== 0 && breadCrumbs.length > 0) {
                localStorage.setItem(guideId, JSON.stringify(breadCrumbs))
            }
        }, [breadCrumbs])

        useEffect(() => {
            if (+guideStepId === 0) {
                dispatch(cleanBreadCrumbs())
                localStorage.removeItem(guideId)
            } else {
                let localStorageBreadCrumbs = localStorage.getItem(guideId)
                if (localStorageBreadCrumbs) {
                    dispatch(setBreadCrumbs(JSON.parse(localStorageBreadCrumbs)))
                }
            }
            dispatch(setIsEdit(false))
        }, [dispatch])

        return (
            <Stack spacing={2}>
                <GuideHeader guide={guide} isEdit={isEdit} isNewGuide={isNewGuide}/>
                <BreadCrumbs/>
                <GuideStep guideStep={guideStep} isEdit={isEdit}/>
            </Stack>
        );
    }
;

export default Guide;