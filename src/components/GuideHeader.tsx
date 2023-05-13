import React, {FC} from 'react';
import {ButtonGroup, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppDispatch} from "../hooks/redux";
import {fetchRemoveGuide} from "../services/actions/guidesActionsCreators";

interface IGuideHeaderProps {
    title: string,
    guideId: string
}

const GuideHeader: FC<IGuideHeaderProps> = ({title, guideId}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleRemoveClick = () => {
        dispatch(fetchRemoveGuide(guideId))
        navigate(routes.main)
    }
    const handleEditionClick = () => {
        navigate(routes.new_guide + '/0', {
            state: {
                guideId: guideId
            }
        })
    }
    const handleOnMainClick = () => {
        navigate(routes.main)
    }
    return (
        <div>
            <Grid container direction="row" justifyContent="space-between" alignItems="start">
                <Grid item xs={8}>
                    <Typography variant="h4" component="h1">{title}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={handleRemoveClick} color="secondary">Удалить</Button>
                        <Button onClick={handleEditionClick}>Редактировать</Button>
                        <Button onClick={handleOnMainClick} variant="outlined">Главная</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    );
};

export default GuideHeader;