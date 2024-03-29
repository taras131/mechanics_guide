import React, {FC} from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {GUIDE_ITEM_TYPE, SECONDARY_TEXT_COLOR} from "../utils/const";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {gitIsMyEditionGuide} from "../services/selectors/guidesSelectors";
import {Paper} from "@mui/material";
import {fetchRemoveGuide} from "../services/actions/guidesActionsCreators";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

interface IGuideStepSpecialFeaturesProps {
    guideStepType: GUIDE_ITEM_TYPE
    currentGuideStepId: number
    guideId: string
}

const GuideStepSpecialFeatures: FC<IGuideStepSpecialFeaturesProps> = ({guideId}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMyGuide = useAppSelector(state => gitIsMyEditionGuide(state));
    const handleRemoveGuideClick = () => {
        navigate(routes.main);
        dispatch(fetchRemoveGuide(guideId));
    };
    return (
        <Paper sx={{padding: 2}}>
            <Stack spacing={2}>
                <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={600}>
                    Специальные возможности
                </Typography>
                <Grid container alignItems="center" justifyContent="start">
                    <Grid item xs={4}>
                        <Button onClick={handleRemoveGuideClick} disabled={!isMyGuide || true}>
                            Удалить гайд
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontSize="12px" color={SECONDARY_TEXT_COLOR} fontWeight={300}>
                            Вы можете удалить гайд , только в том случае, если вы являетесь его автором.
                        </Typography>
                    </Grid>
                </Grid>


            </Stack>
        </Paper>
    );
};

export default GuideStepSpecialFeatures;