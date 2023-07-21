import React, {FC, useEffect, useId, useState} from 'react';
import Button from "@mui/material/Button";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CategoryList from "./CategoryList";
import ModalWindow from "./ModalWindow";
import {getGuideCategories} from "../services/selectors/guidesSelectors";
import {fetchNewGuideCategory} from "../services/actions/guidesActionsCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {validateText} from "../utils/services";
import {
    ADD_CATEGORY_FORM_CONTROL_HEIGHT_PX,
    ADD_CATEGORY_TEXT_FIELD_MAX_WIDTH_PX,
    CENTER,
    H3,
    OUTLINED, STRING_EMPTY, STRING_WITH_SPACE
} from "../utils/const";

const addCategoryTitle = "Добавление категории.";
const newCategoryLabel = "Новая категория";
const addCategoryButtonText = "Добавить";


interface IAddNewCategoryProps {
    isOpenNewCategoryWindow: boolean
    toggleIsOpenNewCategoryWindow: () => void
}

const AddNewCategory: FC<IAddNewCategoryProps> = ({
                                                      isOpenNewCategoryWindow,
                                                      toggleIsOpenNewCategoryWindow
                                                  }) => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => getGuideCategories(state))
    const textFieldId = useId()
    const [newCategoryError, setNewCategoryError] = useState(STRING_WITH_SPACE)
    const [newCategoryName, setNewCategoryName] = useState(STRING_EMPTY)
    const categoriesNames = categories.map(category => category.categoryName)
    const handleAddCategoryClick = () => {
        dispatch(fetchNewGuideCategory(newCategoryName))
        toggleIsOpenNewCategoryWindow()

    }
    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setNewCategoryError, categoriesNames)
        setNewCategoryName(e.target.value)
    }
    useEffect(() => {
        setNewCategoryError(STRING_WITH_SPACE)
        setNewCategoryName(STRING_EMPTY)
    }, [setNewCategoryError, setNewCategoryName])
    return (
        <ModalWindow handleToggleOpen={toggleIsOpenNewCategoryWindow} isOpenModal={isOpenNewCategoryWindow}>
            <Stack spacing={2}>
                <Typography align={CENTER} fontSize={16} fontWeight={600} variant={H3}>
                    {addCategoryTitle}
                </Typography>
                <CategoryList categories={categories}/>
                <FormControl sx={{minHeight: ADD_CATEGORY_FORM_CONTROL_HEIGHT_PX}}>
                    <TextField helperText={newCategoryError}
                               id={textFieldId}
                               label={newCategoryLabel}
                               onChange={handleCategoryNameChange}
                               sx={{maxWidth: ADD_CATEGORY_TEXT_FIELD_MAX_WIDTH_PX}}
                               variant={OUTLINED}
                               value={newCategoryName}/>
                </FormControl>
                <Button disabled={!!newCategoryError} onClick={handleAddCategoryClick}>
                    {addCategoryButtonText}
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default AddNewCategory;