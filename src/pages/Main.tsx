import React, {useEffect} from 'react';
import { Grid} from "@mui/material";
import GuidesList from "../components/GuidesList";
import {useAppSelector} from "../hooks/redux";
import {geiIsGuidesLoading} from "../services/selectors/guidesSelectors";


const Main = () => {
    useEffect(()=> {

    }, [])
    return (
        <Grid container spacing={2}>
            <GuidesList/>
        </Grid>
    );
};

export default Main;