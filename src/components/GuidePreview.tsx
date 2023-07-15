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
import {setIsNewGuideEdition} from "../services/reducers/guides";
import useMediaQuery from '@mui/material/useMediaQuery';
import {setBreadCrumbs} from "../services/reducers/breadCrumbs";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {IBreadCrumb} from "../models/iBreadCrumbs";

interface IGuidePreviewProps {
    guide: IGuide
}

const GuidePreview: FC<IGuidePreviewProps> = ({guide}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countGuideSteps = useAppSelector(state => getCountGuideSteps(state, guide.id))
    const matches = useMediaQuery('(min-width:1200px)');
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
    const handleGuideClick = () => {
        dispatch(setIsNewGuideEdition(false))
        navigate(routes.guide + "/" + guide.id + "/0")
    }
    const handleContinueClick = () => {
        if (parseBreadCrumbs) {
            dispatch(setIsNewGuideEdition(false))
            dispatch(setBreadCrumbs(parseBreadCrumbs))
            navigate(routes.guide + "/" + guide.id + "/" + continueGuideStep)
        }
    }

    return (
        <Grid xs={12} sm={6} md={4}>
            <Card sx={{minWidth: 275}}>
                <Grid
                    direction="column"

                    spacing={2}
                    sx={{width: "100%", height: "100%"}}
                >
                    <CardContent>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Typography sx={{fontSize: 14, fontWeight: 600}} color="text.secondary" gutterBottom>
                                {categoryName}
                            </Typography>
                            <Grid container alignItems="center" justifyContent="space-between">
                                {matches && (
                                    <Typography sx={{fontSize: 12, fontWeight: 100, marginRight: 1}}
                                                color="text.secondary"
                                                gutterBottom>
                                        Количество шагов
                                    </Typography>
                                )}
                                <Avatar
                                    sx={{
                                        bgcolor: deepPurple[500],
                                        height: "24px",
                                        width: "24px",
                                        fontSize: "12px"
                                    }}>{countGuideSteps}</Avatar>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginTop: "10px"}}/>
                        <Typography variant="h5" component="div"
                                    sx={{marginTop: "10px", height: "66px", overflow: "hidden"}}>
                            {guide.title && guide.title.length > 40 ? guide.title.substring(0, 40) + "..." : guide.title}
                        </Typography>
                        <Typography sx={{marginTop: 1}} color="text.secondary">
                            Автор
                        </Typography>
                        <Typography variant="body2">
                            {guide.authorId ? guide.authorId : "неизвестен"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="space-between" sx={{width: "100%"}}>
                            <Button size="small" onClick={handleGuideClick}>
                                Перейти к гайду
                            </Button>
                            {breadCrumbs && (
                                <Button size="small"
                                        onClick={handleContinueClick}
                                        endIcon={<ArrowForwardIcon/>}>
                                    Продолжить
                                </Button>
                            )}
                        </Grid>
                    </CardActions>
                </Grid>
            </Card>
        </Grid>
    );
};

export default GuidePreview;