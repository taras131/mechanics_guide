import React, {FC, useState} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    getEditionGuideStepsByType,
    getGuideById,
    getGuidesWithFilter,
    gitIsMyEditionGuide
} from "../services/selectors/guidesSelectors";
import SelectRedirectGuideStep from "./SelectRedirectGuideStep";
import {Paper} from "@mui/material";
import {fetchRemoveGuide} from "../services/actions/guidesActionsCreators";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import SelectRedirectAnotherGuide from "./SelectRedirectAnotherGuide";

interface IGuideStepSpecialFeaturesProps {
    guideStepType: GUIDE_ITEM_TYPE
    currentGuideStepId: number
    guideId: string
}

const GuideStepSpecialFeatures: FC<IGuideStepSpecialFeaturesProps> = ({
                                                                          guideStepType,
                                                                          currentGuideStepId,
                                                                          guideId
                                                                      }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const currentGuide = useAppSelector(state => getGuideById(state, guideId, true, false))


    const isMyGuide = useAppSelector(state => gitIsMyEditionGuide(state))


    const handleRemoveGuideClick = () => {
        navigate(routes.main)
        dispatch(fetchRemoveGuide(guideId))
    }
    return (
        <Paper sx={{padding: 2}}>
            <Stack spacing={2}>
                <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={600}>
                    Специальные возможности
                </Typography>
                <Grid container alignItems="center" justifyContent="start">
                    <Grid item xs={4}>
                        <Button onClick={handleRemoveGuideClick} disabled={isMyGuide}>
                            Удалить гайд
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Вы можете удалить гайд , только в том случае, если вы являетесь его автором.
                        </Typography>
                    </Grid>
                </Grid>


            </Stack>
        </Paper>
    );
};

export default GuideStepSpecialFeatures;