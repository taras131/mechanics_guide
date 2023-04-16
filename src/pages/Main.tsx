import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import GuidesList from "../components/GuidesList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchAllGuides} from "../services/actions/guidesActionsCreators";


const Main = () => {
    const dispatch = useAppDispatch()
    useEffect(()=> {
dispatch(fetchAllGuides())
    }, [])
    return (
        <Grid container spacing={2}>
            <GuidesList/>
        </Grid>
    );
};

export default Main;