import React, {FC, useEffect} from 'react';
import {IGuideItem} from "../models/iGuide";
import {Paper} from "@mui/material";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GuideStepAnswers from "./GuideStepAnswers";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import {getBreadCrumbsCount, getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";


const GuideStep: FC<IGuideItem> = ({id, text, type, options}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state))
    const breadCrumbsCount = useAppSelector(state => getBreadCrumbsCount(state))
    const guideId = useParams().guideId || "0";
    useEffect(() => {
        window.onpopstate = e => {
            dispatch(removeLastBreadCrumb())
        }
    }, [])
    const handleBackClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumbs?.questionId)
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Paper sx={{padding: 2}}>
            <Stack spacing={3}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" fontSize="18px" color="inherit">
                        {type === GUIDE_ITEM_TYPE.result ? "Результат" : ` Вопрос № ${breadCrumbsCount+1}`}
                    </Typography>
                    <Button onClick={handleBackClick} disabled={!lastBreadCrumbs}>
                        Назад
                    </Button>
                </Grid>

                <Typography fontWeight={600}>
                    {text}
                </Typography>
                <GuideStepAnswers options={[...options]} questionText={text} questionId={id}/>
            </Stack>


        </Paper>
    );
};

export default GuideStep;