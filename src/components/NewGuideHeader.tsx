import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {getEditionGuideId, getIsNewGuide, getNewGuide} from "../services/selectors/newGuideSelectors";
import {useNavigate} from "react-router-dom";
import {cleanNewGuide} from "../services/reducers/newGuide";
import {getIsAuth, getUser} from "../services/selectors/authSelector";
import Stack from '@mui/material/Stack';

const NewGuideHeader = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const newGuide = useAppSelector(state => getNewGuide(state))
    const isNewGuide = useAppSelector(state => getIsNewGuide(state))
    const editionGuideId = useAppSelector(state => getEditionGuideId(state))
    const isAuth = useAppSelector(state => getIsAuth(state))
    const user = useAppSelector(state => getUser(state))
    const handleSaveClick = () => {
        navigate("/")
        if (isNewGuide) {
            dispatch(fetchNewGuide({...newGuide, authorId: user.id}))
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
                <Stack>
                    <Button variant="contained"
                            color="success"
                            onClick={handleSaveClick}
                            disabled={!isAuth}>
                        Сохранить Гайд
                    </Button>
                    {!isAuth && (<Typography component="span" fontSize="10px" fontWeight="500">
                        авторизуйтесь, чтобы сохранить
                    </Typography>)}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default NewGuideHeader;