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

interface IGuidePreviewProps {
    guide: IGuide
}

const GuidePreview: FC<IGuidePreviewProps> = ({guide}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countGuideSteps = useAppSelector(state => getCountGuideSteps(state, guide.id))
    const handleGuideClick = () => {
        dispatch(setIsNewGuideEdition(false))
        navigate(routes.guide + "/" + guide.id + "/0")
    }
    return (
        <Grid xs={12} sm={6} md={4}>
            <Card sx={{minWidth: 275, minHeight: 250}}>
                <Grid
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{width: "100%", height: "100%"}}
                >
                    <CardContent>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Typography sx={{fontSize: 14, fontWeight: 600}} color="text.secondary" gutterBottom>
                                {categoryName}
                            </Typography>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Typography sx={{fontSize: 12, fontWeight: 100, marginRight: 1}} color="text.secondary"
                                            gutterBottom>
                                    Глубина гайда
                                </Typography>
                                <Avatar sx={{bgcolor: deepPurple[500]}}>{countGuideSteps}</Avatar>
                            </Grid>
                        </Grid>
                        <Divider sx={{marginTop: "10px"}}/>
                        <Typography variant="h5" component="div" sx={{marginTop: "10px"}}>
                            {guide.title && guide.title.length > 50 ? guide.title.substring(0, 50) : guide.title}
                        </Typography>
                        <Typography sx={{marginTop: 1}} color="text.secondary">
                            Автор
                        </Typography>
                        <Typography variant="body2">
                            {guide.authorId ? guide.authorId : "неизвестен"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleGuideClick}>Перейти к гайду</Button>
                    </CardActions>
                </Grid>
            </Card>
        </Grid>
    );
};

export default GuidePreview;