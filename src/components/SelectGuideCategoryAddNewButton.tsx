import React, {FC} from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {PRIMARY} from "../utils/const";
import Button from "@mui/material/Button";

interface IProps {
    handleClick: () => void
}

const addNewCategoryButtonText = "Добавить";

const SelectGuideCategoryAddNewButton: FC<IProps> = ({handleClick}) => {
    return (
        <div>
            <Button onClick={handleClick} startIcon={(<AddBoxIcon/>)} color={PRIMARY}>
                {addNewCategoryButtonText}
            </Button>
        </div>
    );
};

export default SelectGuideCategoryAddNewButton;