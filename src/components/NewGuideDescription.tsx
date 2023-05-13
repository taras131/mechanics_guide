import React from 'react';
import {Grid, SelectChangeEvent, TextField} from "@mui/material";
import {updateTitle, setCategory} from "../services/reducers/newGuide";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getNewGuide} from "../services/selectors/newGuideSelectors";
import {categoryVariants} from "../utils/const";
import GuideSelectCategory from "./GuideSelectCategory";

const NewGuideDescription = () => {
    const dispatch = useAppDispatch()
    const {title, category} = useAppSelector(state => getNewGuide(state))
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    const handleCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setCategory(e.target.value))
    }
    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={8} sx={{padding: "0"}}>
                <TextField fullWidth
                           id="title"
                           name="title"
                           label="Название гайда"
                           variant="outlined"
                           value={title}
                           onChange={handleTitleChange}/>
            </Grid>
            <Grid item xs={3}>
                <GuideSelectCategory variants={categoryVariants}
                                     currentCategory={category}
                                     handleCategoryChange={handleCategoryChange}/>
            </Grid>
        </Grid>
    );
};

export default NewGuideDescription;