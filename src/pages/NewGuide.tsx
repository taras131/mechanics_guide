import React from 'react';
import {useParams} from "react-router-dom";
import {Stack, TextField} from "@mui/material";
import NewGuideItem from "../components/NewGuideItem";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getBreadCrumbs, getNewGuide} from "../services/selectors/newGuideSelectors";
import {updateTitle} from "../services/reducers/newGuide";
import NewGuideBreadCrumbs from "../components/NewGuideBreadCrumbs";
import NewGuideHeader from "../components/NewGuideHeader";

const NewGuide = () => {
    const dispatch = useAppDispatch()
    const itemId = useParams().itemId || 0;
    const {title} = useAppSelector(state => getNewGuide(state))
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    return (
        <Stack spacing={2}>
            <NewGuideHeader/>
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
        </Stack>
    );
};

export default NewGuide;