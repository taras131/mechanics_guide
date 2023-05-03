import React, {FC, useState} from 'react';
import NewGuideOptionsList from "./NewGuideOptionsList";
import NewGuideAddOptionModal from "./NewGuideAddOptionModal";
import {IGuideItem} from "../models/newGuideInterface";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";

interface INewGuideOptionsProps {
    currentGuideItem: IGuideItem
}

const NewGuideOptions: FC<INewGuideOptionsProps> = ({currentGuideItem}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const handleToggleOpen = () => {
        setIsOpenModal(prev => !prev)
    }
    return (
        <Stack spacing={2}>
            <NewGuideOptionsList guideItemId={currentGuideItem.id}
                                 questionText={currentGuideItem.text}/>
            <Button onClick={handleToggleOpen}
                    variant="contained"
                    sx={{width: "220px"}}>
                Добавить вариант
            </Button>
            <NewGuideAddOptionModal id={currentGuideItem.id}
                                    isOpenModal={isOpenModal}
                                    handleToggleOpen={handleToggleOpen}/>
        </Stack>
    );
};

export default NewGuideOptions;