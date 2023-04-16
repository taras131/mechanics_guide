import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchNewGuide} from "../services/actions/guidesActionsCreators";
import {getNewGuide} from "../services/selectors/newGuideSelectors";

const NewGuideHeader = () => {
    const dispatch = useAppDispatch()
    const newGuide = useAppSelector(state => getNewGuide(state))
    const handleSaveClick = () => {
        dispatch(fetchNewGuide(newGuide))
    }
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h4" component="h1">Новый гайд</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={handleSaveClick}>Сохранить Гайд</Button>
            </Grid>
        </Grid>
    );
};

export default NewGuideHeader;