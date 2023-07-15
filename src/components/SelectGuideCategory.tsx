import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getGuideCategories} from "../services/selectors/guidesSelectors";

interface ISelectGuideCategoryProps {
    selectedGuideCategoryId: string
    addCategoryButton?: React.ReactNode
    handleGuideCategoryChange: (e: SelectChangeEvent) => void
}

const SelectGuideCategory: FC<ISelectGuideCategoryProps> = ({
                                                                selectedGuideCategoryId,
                                                                handleGuideCategoryChange,
                                                                addCategoryButton
                                                            }) => {
    const guidesCategory = useAppSelector(state => getGuideCategories(state))
    const categoryList = guidesCategory.map(category => (
        <MenuItem key={`${category.id}_${category.categoryName}`} value={category.id}>{category.categoryName}</MenuItem>))
    return (
        <FormControl fullWidth sx={{minWidth: "250px"}}>
            <InputLabel id="simple-select-label">Категория</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                defaultValue=""
                value={selectedGuideCategoryId}
                label="Category"
                onChange={handleGuideCategoryChange}
            >
                {addCategoryButton ? [...categoryList, addCategoryButton] : categoryList}
            </Select>
        </FormControl>
    );
};

export default SelectGuideCategory;