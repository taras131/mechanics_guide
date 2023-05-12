import React, {FC} from 'react';
import {Grid, SelectChangeEvent} from "@mui/material";
import GuideSelectCategory from "./GuideSelectCategory";
import {ALL_CATEGORIES, categoryVariants} from "../utils/const";

interface IGuidesFilterProps {
    currentCategory: string
    handleCategoryChange: (e: SelectChangeEvent) => void
}

const GuidesFilter: FC<IGuidesFilterProps> = ({currentCategory, handleCategoryChange}) => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4}>
                <GuideSelectCategory variants={[ALL_CATEGORIES, ...categoryVariants]}
                                     currentCategory={currentCategory}
                                     handleCategoryChange={handleCategoryChange}/>
            </Grid>
        </Grid>
    );
};

export default GuidesFilter;