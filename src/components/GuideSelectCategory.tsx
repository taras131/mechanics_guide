import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface GuideSelectCategoryProps {
    variants: string[]
    currentCategory: string
    handleCategoryChange: (e: SelectChangeEvent) => void
}

const GuideSelectCategory: FC<GuideSelectCategoryProps> = ({
                                                               variants,
                                                               currentCategory,
                                                               handleCategoryChange
                                                           }) => {
    const selectCategoryList = variants.map(category =>
        (<MenuItem key={category} value={category}>{category}</MenuItem>))
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="category">Категория</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="category"
                    value={currentCategory}
                    label="category"
                    onChange={handleCategoryChange}
                >
                    {selectCategoryList}
                </Select>
            </FormControl>
        </div>
    );
};

export default GuideSelectCategory;