import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById, getGuideMode, getGuideStepById, gitIsMyEditionGuide} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";
import {cleanBreadCrumbs, setBreadCrumbs} from "../services/reducers/breadCrumbs"
import GuideHeader from "../components/GuideHeader";
import GuideStep from "../components/GuideStep";
import {emptyGuide, setEditionGuide, setGuideMode} from "../services/reducers/guides"
import GuideStepSpecialFeatures from "../components/GuideStepSpecialFeatures";
import GuideComments from "../components/GuideComments";
import {GUIDE_MODE, MESSAGE_SEVERITY} from "../utils/const";
import Preloader from "../components/Preloader";
import {setMessage} from "../services/reducers/message";

const Guide = () => {
        const firstUpdate = useRef(true);
        const dispatch = useAppDispatch()
        const guideId = useParams().guideId || "0";
        const guideStepId = useParams().stepId || "0";
        const guideMode = useAppSelector(state => getGuideMode(state))
        const guide = useAppSelector(state => getGuideById(state, guideId, guideMode))
        const isMyGuide = useAppSelector(state => gitIsMyEditionGuide(state))
        const guideStep = useAppSelector(state => getGuideStepById(state, guideId, +guideStepId, guideMode))
        const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
        const [expanded, setExpanded] = useState<string | false>(false)
        const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
        useEffect(() => {
            if (guideId === GUIDE_MODE.new_guide) {
                dispatch(setGuideMode(GUIDE_MODE.new_guide))
                const oldNewGuide = localStorage.getItem("saved_new_guide")
                if (oldNewGuide) {
                    dispatch(setMessage({
                        severity: MESSAGE_SEVERITY.info,
                        text: "Были загружены не сохранённые ранее данные. Нажмите `Сбросить` , что бы сбросить изменения."
                    }))
                    dispatch(setEditionGuide(JSON.parse(oldNewGuide)))
                } else {
                    dispatch(setEditionGuide(emptyGuide))
                }
            }
            if (guideMode === GUIDE_MODE.editing) {
                const oldSavingEditionGuide = localStorage.getItem(`${GUIDE_MODE.editing}_${guide.id}`)
                if (oldSavingEditionGuide) {
                    dispatch(setEditionGuide(JSON.parse(oldSavingEditionGuide)))
                    dispatch(setMessage({
                        severity: MESSAGE_SEVERITY.info,
                        text: "Были загружены не сохранённые ранее данные. Нажмите `Отмена` , что бы сбросить изменения."
                    }))
                }
            }
        }, [guideMode])
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
        }, [dispatch])

        useEffect(() => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
            } else {
                if (guideMode === GUIDE_MODE.new_guide &&
                    JSON.stringify(emptyGuide) !== JSON.stringify(guide)) {
                    localStorage.setItem("saved_new_guide", JSON.stringify(guide))
                }
                if (guideMode === GUIDE_MODE.editing) {
                    localStorage.setItem(`${GUIDE_MODE.editing}_${guide.id}`, JSON.stringify(guide))
                }
            }
        }, [guide])
        if (!guide) {
            return (<Preloader/>)
        }
        return (
            <Stack spacing={4}>
                <GuideHeader guide={guide} guideMode={guideMode}/>
                {guideStep && (
                    <GuideStep guideStep={guideStep}
                               isEdit={guideMode === GUIDE_MODE.editing || guideMode === GUIDE_MODE.new_guide}/>
                )}
                <div>
                    <BreadCrumbs expanded={expanded} handleExpandedChange={handleExpandedChange}/>
                    <GuideComments expanded={expanded} handleExpandedChange={handleExpandedChange} guideId={guideId}/>
                </div>
                {guideMode === GUIDE_MODE.new_guide
                    && isMyGuide && guideStep && (<GuideStepSpecialFeatures guideStepType={guideStep.type}
                                                                            currentGuideStepId={guideStep.id}
                                                                            guideId={guide.id}/>)}
            </Stack>
        );
    }
;

export default Guide;