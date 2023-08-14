import React, {FC} from 'react';
import {IGuide} from "../models/iGuide";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import {Card, CardActions, CardContent, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategoryNameById} from "../services/selectors/guidesSelectors";
import {deepPurple} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import useMediaQuery from '@mui/material/useMediaQuery';
import {setBreadCrumbs} from "../services/reducers/breadCrumbs";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {IBreadCrumb} from "../models/iBreadCrumbs";
import {
    CENTER,
    DIV,
    GUIDE_MODE,
    H5,
    HIDDEN,
    ROW,
    SECONDARY_TEXT_COLOR,
    SMALL,
    SPACE_BETWEEN,
    START
} from "../utils/const";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Stack from "@mui/material/Stack";
import {setGuideMode} from "../services/reducers/guides";

interface IGuidePreviewProps {
    guide: IGuide
}

const authorUnknownText = "неизвестен";
const goToGuideButtonText = "Начать";
const continueGuideButtonText = "Продолжить";

const countStepsText = "Количество шагов";
const authorTextTitle = "Автор:";

const GuidePreview: FC<IGuidePreviewProps> = ({guide}) => {
    const dispatch = useAppDispatch()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countGuideSteps = useAppSelector(state => getCountGuideSteps(state, guide.id))
    const matches = useMediaQuery('(min-width:1200px)');
    const navigate = useNavigate()
    const breadCrumbs = localStorage.getItem(guide.id)
    let parseBreadCrumbs: IBreadCrumb []
    let continueGuideStep: number = 0
    if (breadCrumbs) {
        parseBreadCrumbs = JSON.parse(breadCrumbs)
        const nextId = parseBreadCrumbs[parseBreadCrumbs.length - 1].nextId
        if (nextId) {
            continueGuideStep = nextId
        } else {
            continueGuideStep = parseBreadCrumbs[parseBreadCrumbs.length - 1].questionId
        }
    }
    const handleContinueClick = () => {
        if (parseBreadCrumbs) {
            dispatch(setGuideMode(GUIDE_MODE.viewing))
            dispatch(setBreadCrumbs(parseBreadCrumbs))
            navigate(`${routes.guide}/${guide.id}/${continueGuideStep}`)
        }
    }
    const handleGuideClick = () => {
        dispatch(setGuideMode(GUIDE_MODE.viewing))
        navigate(`${routes.guide}/${guide.id}/0`)
    }
    return (
        <Grid xs={12} sm={6} md={4}>
            <Card sx={{minWidth: 200}}>
                <CardContent sx={{paddingBottom: 0}}>
                    <Grid container alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                        <Typography
                            sx={{fontSize: 14, fontWeight: 600}}
                            color={SECONDARY_TEXT_COLOR}
                            gutterBottom>
                            {categoryName && categoryName.length > 26 ? categoryName.substring(0, 23) + "..." : categoryName}
                        </Typography>
                        <Grid container alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                            {matches && (
                                <Typography sx={{fontSize: 12, fontWeight: 100, marginRight: 1}}
                                            color={SECONDARY_TEXT_COLOR}
                                            gutterBottom>
                                    {countStepsText}
                                </Typography>
                            )}
                            <Avatar sx={{
                                bgcolor: deepPurple[500],
                                height: "24px",
                                width: "24px",
                                fontSize: "12px"
                            }}>
                                {countGuideSteps}
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Divider sx={{marginTop: "10px"}}/>
                    <Typography variant={H5}
                                component={DIV}
                                sx={{
                                    marginTop: "10px",
                                    minHeight: "130px",
                                    overflow: {HIDDEN}
                                }}>
                        {guide.title && guide.title.length > 70 ? guide.title.substring(0, 67) + "..." : guide.title}
                    </Typography>
                    <Stack spacing={1} direction={ROW} justifyContent={START} alignItems={CENTER} sx={{marginTop: 1}}>
                        <Typography color={SECONDARY_TEXT_COLOR}>
                            {authorTextTitle}
                        </Typography>
                        <Typography variant="body2">
                            {guide.authorId ? guide.authorId : authorUnknownText}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Grid container alignItems={CENTER} justifyContent={SPACE_BETWEEN} sx={{width: "100%"}}>
                        <Button startIcon={<ArrowUpwardIcon/>} size={SMALL} onClick={handleGuideClick}>
                            {goToGuideButtonText}
                        </Button>
                        {breadCrumbs && (
                            <Button endIcon={<ArrowForwardIcon/>} size={SMALL} onClick={handleContinueClick}>
                                {continueGuideButtonText}
                            </Button>
                        )}
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GuidePreview;