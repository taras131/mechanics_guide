import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {getEditionGuideId, getIsNewGuide, getNewGuide} from "../services/selectors/newGuideSelectors";
import {useNavigate} from "react-router-dom";
import {cleanNewGuide} from "../services/reducers/newGuide";

const NewGuideHeader = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const newGuide = useAppSelector(state => getNewGuide(state))
    const isNewGuide = useAppSelector(state => getIsNewGuide(state))
    const editionGuideId = useAppSelector(state => getEditionGuideId(state))
    const handleSaveClick = () => {
        navigate("/")
        if (isNewGuide) {
            dispatch(fetchNewGuide(newGuide))
        } else {
            dispatch(fetchUpdateGuide({...newGuide, id: editionGuideId}))
        }
        dispatch(cleanNewGuide())
    }
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h4" component="h1">
                    {isNewGuide
                        ? "Новый гайд"
                        : "Редактируемый гайд"}
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained"
                        color="success"
                        onClick={handleSaveClick}>
                    Сохранить Гайд
                </Button>
            </Grid>
        </Grid>
    );
};

export default NewGuideHeader;