import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideById} from "../services/selectors/guidesSelectors";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import BreadCrumbs from "../components/BreadCrumbs";

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

            </Stack>
        );
    }
;

export default Guide;