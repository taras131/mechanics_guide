import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import {updateTitle, setCategory} from "../services/reducers/newGuide";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getNewGuide} from "../services/selectors/newGuideSelectors";

const categoryVariants: string[] = ["Двигатель", "Трансмиссия", "Тормозная система", "Электрооборудование"]

const NewGuideDescription = () => {
    const dispatch = useAppDispatch()
    const {title, category} = useAppSelector(state => getNewGuide(state))
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTitle(e.target.value))
    }
    const handleCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setCategory(e.target.value))
    }
    const selectCategoryList = categoryVariants.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))
    return (
        <Grid container  justifyContent="space-between" >
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
                <FormControl fullWidth>
                    <InputLabel id="category">Категория</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="category"
                        value={category}
                        label="category"
                        onChange={handleCategoryChange}
                    >
                        {selectCategoryList}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default NewGuideDescription;