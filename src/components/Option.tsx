import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {IGuideItemOption} from "../models/newGuideInterface";


interface IProps extends IGuideItemOption {
    handleSelectOption: (nextQuestionId: number) => void
}

const Option: FC<IProps> = ({text, nextId, handleSelectOption}) => {
    const handleClick = () => {
        handleSelectOption(nextId)
    }
    return (
        <Button variant="contained" onClick={handleClick}>
            {text}
        </Button>
    );
};

export default Option;