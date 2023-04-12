import React from 'react';
import {useParams} from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import NewGuideItem from "../components/NewGuideItem";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getNewGuide} from "../services/selectors/newGuideSelectors";
import {updateTitle} from "../services/reducers/newGuide";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const itemId = useParams().itemId || 0;
    const {title} = useAppSelector(state => getNewGuide(state))
    console.log(itemId)
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Typography>Новый гайд</Typography>
            <TextField id="title"
                       name="title"
                       label="Название гайда"
                       variant="outlined"
                       value={title}
                       onChange={handleTitleChange}/>
            <NewGuideItem id={+itemId}/>
            <Button>Сохранить</Button>
        </Grid>
    );
};

export default NewGuide;