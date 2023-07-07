import React, {FC, useState} from 'react';
import ModalWindow from "./ModalWindow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CategoryList from "./CategoryList";
import {useAppDispatch} from "../hooks/redux";
import {fetchNewGuideCategory} from "../services/actions/guidesActionsCreators";

interface IAddNewCategoryProps {
    isOpenNewCategoryWindow: boolean
    toggleIsOpenNewCategoryWindow: () => void
}

const AddNewCategory: FC<IAddNewCategoryProps> = ({isOpenNewCategoryWindow,
                                                      toggleIsOpenNewCategoryWindow}) => {
    const dispatch = useAppDispatch()
    const [newCategoryName, setNewCategoryName] = useState("")
    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value)
    }
    const handleAddCategoryClick = () => {
        dispatch(fetchNewGuideCategory(newCategoryName))
    }
    return (
        <ModalWindow isOpenModal={isOpenNewCategoryWindow} handleToggleOpen={toggleIsOpenNewCategoryWindow}>
            <Stack spacing={1}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600}>
                    Добавление категории
                </Typography>
                <CategoryList/>
                <TextField value={newCategoryName}
                           onChange={handleCategoryNameChange}
                           id="outlined-basic"
                           label="Новая категория"
                           variant="outlined"/>
                <Button onClick={handleAddCategoryClick}>Добавить</Button>
            </Stack>
        </ModalWindow>
    );
};

export default AddNewCategory;