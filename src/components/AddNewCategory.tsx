import React, {FC, useEffect, useId, useState} from 'react';
import ModalWindow from "./ModalWindow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CategoryList from "./CategoryList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchNewGuideCategory} from "../services/actions/guidesActionsCreators";
import {getGuideCategories} from "../services/selectors/guidesSelectors";
import {FormControl, InputLabel} from "@mui/material";

interface IAddNewCategoryProps {
    isOpenNewCategoryWindow: boolean
    toggleIsOpenNewCategoryWindow: () => void
}

const AddNewCategory: FC<IAddNewCategoryProps> = ({
                                                      isOpenNewCategoryWindow,
                                                      toggleIsOpenNewCategoryWindow
                                                  }) => {
    const dispatch = useAppDispatch()
    const [newCategoryName, setNewCategoryName] = useState("")
    const [newCategoryError, setNewCategoryError] = useState(" ")
    const textFieldId = useId()
    const categories = useAppSelector(state => getGuideCategories(state))
    const checkExistsCategory = (newValue: string): boolean => {
        let isExist = false
        categories.forEach(category => {
            if (category.categoryName.toUpperCase() === newValue.toUpperCase()) {
                isExist = true
                return
            }
        })
        return isExist
    }
    const validateCategoryName = (newValue: string) => {
        setNewCategoryError("")
        const newValueNumberLetters = newValue.match(/[a-zA-Zа-яА-Я]/g)
        if (!newValueNumberLetters) {
            setNewCategoryError("Поле должно содержать буквы")
        } else {
            if (newValueNumberLetters.length < 3) {
                setNewCategoryError("Поле должно содержать не меньше трёх букв")
            } else {
                if (checkExistsCategory(newValue)) {
                    setNewCategoryError("Такая категория уже существует")
                }
            }
        }
    }
    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateCategoryName(e.target.value)
        setNewCategoryName(e.target.value)
    }
    const handleAddCategoryClick = () => {
        dispatch(fetchNewGuideCategory(newCategoryName))
        toggleIsOpenNewCategoryWindow()

    }
    useEffect(() => {
        setNewCategoryName("")
        setNewCategoryError(" ")
    }, [setNewCategoryName, setNewCategoryError])
    return (
        <ModalWindow isOpenModal={isOpenNewCategoryWindow} handleToggleOpen={toggleIsOpenNewCategoryWindow}>
            <Stack spacing={2}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600} align="center">
                    Добавление категории.
                </Typography>
                <CategoryList categories={categories}/>
                <FormControl sx={{minHeight: "80px"}}>
                    <TextField value={newCategoryName}
                               onChange={handleCategoryNameChange}
                               id={textFieldId}
                               label="Новая категория"
                               variant="outlined"
                               sx={{maxWidth: "390px"}}
                               helperText={newCategoryError}/>
                </FormControl>
                <Button onClick={handleAddCategoryClick}
                        disabled={!!newCategoryError}>
                    Добавить
                </Button>
            </Stack>
        </ModalWindow>
    );
};

export default AddNewCategory;