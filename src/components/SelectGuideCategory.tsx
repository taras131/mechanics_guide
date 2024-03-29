import React, {FC, useId, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getGuideCategories, getGuideMode} from "../services/selectors/guidesSelectors";
import AddNewStringValueModal from "./AddNewStringValueModal";
import {
    ADD_CATEGORY_LABEL,
    ADD_CATEGORY_SUBHEADER_TEXT,
    ADD_CATEGORY_TITLE, GUIDE_MODE,
    HIDDEN,
    STRING_EMPTY,
} from "../utils/const";
import {fetchNewGuideCategory} from "../services/actions/guidesActionsCreators";
import SelectGuideCategoryAddNewButton from "./SelectGuideCategoryAddNewButton";

interface ISelectGuideCategoryProps {
    selectedGuideCategoryId: string

    handleGuideCategoryChange: (e: SelectChangeEvent) => void
}

const selectLabel = "Категория";

const SelectGuideCategory: FC<ISelectGuideCategoryProps> = ({
                                                                selectedGuideCategoryId,
                                                                handleGuideCategoryChange,

                                                            }) => {
    const guidesCategory = useAppSelector(state => getGuideCategories(state));
    const labelId = useId();
    const selectId = useId();
    const selectName = useId();
    const dispatch = useAppDispatch();
    const [isOpenNewCategoryWindow, setIsOpenNewCategoryWindow] = useState(false);
    const guideMode = useAppSelector(state => getGuideMode(state));
    const categories = useAppSelector(state => getGuideCategories(state));
    const categoriesNames = categories.map(category => category.categoryName);
    const toggleIsOpenNewCategoryWindow = () => {
        setIsOpenNewCategoryWindow(prev => !prev);
    };
    const handleAddCategoryWindowClick = () => {
        toggleIsOpenNewCategoryWindow();
    };
    const handleAddCategoryClick = (newCategoryName: string) => {
        dispatch(fetchNewGuideCategory(newCategoryName));
    };
    let categoryList = guidesCategory.map(category => (
        <MenuItem key={`${category.id}_${category.categoryName}`}
                  value={category.id}>{category.categoryName}</MenuItem>));
    if (guideMode !== GUIDE_MODE.viewing) {
        categoryList = [...categoryList, (
            <SelectGuideCategoryAddNewButton key="add_category_button" handleClick={handleAddCategoryWindowClick}/>)];
    }
    return (
        <>
            <FormControl fullWidth sx={{width: "260px"}}>
                <InputLabel id={labelId}>Категория</InputLabel>
                <Select
                    id={selectId}
                    name={selectName}
                    labelId={labelId}
                    defaultValue={STRING_EMPTY}
                    value={selectedGuideCategoryId}
                    label={selectLabel}
                    onChange={handleGuideCategoryChange}
                    sx={{overflow: HIDDEN}}
                >
                    {categoryList}
                </Select>
            </FormControl>
            <AddNewStringValueModal
                existingValues={categoriesNames}
                fieldLabelText={ADD_CATEGORY_LABEL}
                isOpenWindow={isOpenNewCategoryWindow}
                listSubHeaderText={ADD_CATEGORY_SUBHEADER_TEXT}
                onAddNewValueClick={handleAddCategoryClick}
                title={ADD_CATEGORY_TITLE}
                toggleIsOpenWindow={toggleIsOpenNewCategoryWindow}/>
        </>
    );
};

export default SelectGuideCategory;