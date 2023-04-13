import React, {useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Grid, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import NewGuideItem from "../components/NewGuideItem";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getBreadCrumbs, getNewGuide} from "../services/selectors/newGuideSelectors";
import {removeLastBreadCrumb, updateTitle} from "../services/reducers/newGuide";
import NewGuideBreadCrumbs from "../components/NewGuideBreadCrumbs";
import Box from "@mui/material/Box";
import {routes} from "../utils/routes";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const itemId = useParams().itemId || 0;
    const {title} = useAppSelector(state => getNewGuide(state))
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    let prevItemId = 0
    if (bredCrumbs.length) prevItemId = bredCrumbs[bredCrumbs.length - 1].prevItemId
    const handleBackClick = () => {
        navigate(routes.new_guide + "/" + prevItemId)
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: 500,
                maxWidth: '100%',
                margin: '0 auto'
            }}
        >
            <Stack direction="row" spacing={2}>
                <Typography variant="h3" component="h1">Новый гайд</Typography>
                <Button variant="contained">Сохранить Гайд</Button>
            </Stack>
            <TextField fullWidth
                       id="title"
                       name="title"
                       label="Название гайда"
                       variant="outlined"
                       value={title}
                       onChange={handleTitleChange}
                       sx={{marginTop: "20px"}}/>

            {bredCrumbs && bredCrumbs.length > 0 && (<NewGuideBreadCrumbs/>)}
            <NewGuideItem id={+itemId}/>
            <Stack spacing={2} direction="row" mt={"20px"}>
                {bredCrumbs && bredCrumbs.length > 0 && (
                    <Button variant="outlined" onClick={handleBackClick}>Назад</Button>
                )}
            </Stack>
        </Grid>
    );
};

export default NewGuide;