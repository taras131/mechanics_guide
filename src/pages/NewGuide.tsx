import React from 'react';
import {useLocation, useNavigate, useNavigation, useParams} from "react-router-dom";
import {Grid, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import NewGuideItem from "../components/NewGuideItem";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getNewGuide} from "../services/selectors/newGuideSelectors";
import {updateTitle} from "../services/reducers/newGuide";
import {routes} from "../utils/routes";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const itemId = useParams().itemId || 0;
    const locationState = useLocation().state
    const {title} = useAppSelector(state => getNewGuide(state))
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    const handleBackClick = () => {
        if (locationState.from) {
            navigate(locationState.from)
        }
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
            <Typography variant="h3" component="h1">Новый гайд</Typography>
            <TextField fullWidth
                       id="title"
                       name="title"
                       label="Название гайда"
                       variant="outlined"
                       value={title}
                       onChange={handleTitleChange}
                       sx={{marginTop: "20px"}}/>
            <NewGuideItem id={+itemId}/>
            <Stack spacing={2} direction="row" mt={"20px"}>
                {locationState && locationState.from && (
                    <Button variant="outlined" onClick={handleBackClick}>Назад</Button>
                )}
                <Button variant="contained">Сохранить Гайд</Button>
            </Stack>
        </Grid>
    );
};

export default NewGuide;