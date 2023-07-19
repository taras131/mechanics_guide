import React, {FC, useId} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getGuideCategories} from "../services/selectors/guidesSelectors";

interface ISelectGuideCategoryProps {
    selectedGuideCategoryId: string

    handleGuideCategoryChange: (e: SelectChangeEvent) => void
}

const SelectGuideCategory: FC<ISelectGuideCategoryProps> = ({
                                                                selectedGuideCategoryId,
                                                                handleGuideCategoryChange,

                                                            }) => {
    const guidesCategory = useAppSelector(state => getGuideCategories(state))
    const labelId = useId()
    const selectId = useId()
    const selectName = useId()
    const categoryList = guidesCategory.map(category => (
        <MenuItem key={`${category.id}_${category.categoryName}`}
                  value={category.id}>{category.categoryName}</MenuItem>))
    return (
        <FormControl fullWidth sx={{minWidth: "250px"}}>
            <InputLabel id={labelId}>Категория</InputLabel>
            <Select
                id={selectId}
                name={selectName}
                labelId={labelId}
                defaultValue=""
                value={selectedGuideCategoryId}
                label="Категория"
                onChange={handleGuideCategoryChange}
            >
                {categoryList}
            </Select>
        </FormControl>
    );
};

export default SelectGuideCategory;