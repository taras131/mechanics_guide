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
import {CENTER, COLUMN, DIV, H5, HIDDEN, OUTLINED, PRIMARY, SMALL, SPACE_BETWEEN} from "../utils/const";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from "@mui/material/IconButton";

interface IGuidePreviewProps {
    guide: IGuide
}

const authorUnknownText = "неизвестен";
const goToGuideButtonText = "Перейти к гайду"
const textColor = "text.secondary";
const countStepsText = "Количество шагов";

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
            dispatch(setIsNewGuideEdition(false))
            dispatch(setBreadCrumbs(parseBreadCrumbs))
            navigate(`${routes.guide}/${guide.id}/${continueGuideStep}`)
        }
    }
    const handleGuideClick = () => {
        dispatch(setIsNewGuideEdition(false))
        navigate(`${routes.guide}/${guide.id}/0`)
    }
    return (
        <Grid xs={12} sm={6} md={4}>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Grid container alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                        <Typography sx={{fontSize: 14, fontWeight: 600}} color={textColor} gutterBottom>
                            {categoryName}
                        </Typography>
                        <Grid container alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                            {matches && (
                                <Typography sx={{fontSize: 12, fontWeight: 100, marginRight: 1}}
                                            color={textColor}
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
                                    minHeight: "66px",
                                    overflow: {HIDDEN}
                                }}>
                        {guide.title && guide.title.length > 35 ? guide.title.substring(0, 35) + "..." : guide.title}
                    </Typography>
                    <Typography sx={{marginTop: 1}} color={textColor}>
                        Автор
                    </Typography>
                    <Typography variant="body2">
                        {guide.authorId ? guide.authorId : authorUnknownText}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid spacing={1} container alignItems={CENTER} justifyContent={SPACE_BETWEEN} sx={{width: "100%"}}>
                        <Button startIcon={<ArrowUpwardIcon/>} size={SMALL} onClick={handleGuideClick}>
                            {goToGuideButtonText}
                        </Button>
                        {breadCrumbs && (
                            <IconButton aria-label="continue" onClick={handleContinueClick} size={SMALL}
                                        color={PRIMARY}>
                                <ArrowForwardIcon/>
                            </IconButton>
                        )}
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GuidePreview;