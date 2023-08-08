import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById, getGuideStepById, getIsEdit, getIsNewGuide} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import {cleanBreadCrumbs, setBreadCrumbs} from "../services/reducers/breadCrumbs"
import GuideHeader from "../components/GuideHeader";
import GuideStep from "../components/GuideStep";
import {setEditionGuide, setIsEdit} from "../services/reducers/guides"
import GuideStepSpecialFeatures from "../components/GuideStepSpecialFeatures";

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
            return () => {
                dispatch(setIsEdit(false))
            }
        }, [dispatch])

        useEffect(() => {
            if (isNewGuide && guide.items.length > 1) {
                console.log("Затираем" + guide.items.length)
                localStorage.setItem("new_guide", JSON.stringify(guide))
            }
        }, [guide])
        useEffect(() => {
            if (isNewGuide) {
                const getOldNewGuide = localStorage.getItem("new_guide")
                console.log(getOldNewGuide)
                if (getOldNewGuide) {
                    dispatch(setEditionGuide(JSON.parse(getOldNewGuide)))
                }
            }
        }, [dispatch])
        return (
            <Stack spacing={4}>
                <GuideHeader guide={guide} isEdit={isEdit} isNewGuide={isNewGuide}/>
                <GuideStep guideStep={guideStep} isEdit={isEdit}/>
                <BreadCrumbs/>
                {isEdit && (<GuideStepSpecialFeatures guideStepType={guideStep.type}
                                                      currentGuideStepId={guideStep.id}
                                                      guideId={guide.id}/>)}
            </Stack>
        );
    }
;

export default Guide;