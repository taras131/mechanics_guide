import React, {FC} from 'react';
import {IOption, IQuestion} from "../models/guideInterface";
import Button from "@mui/material/Button";


interface IProps extends IOption {
    handleSelectOption: (nextQuestionId: number) => void
}

const Option: FC<IProps> = ({text, nextQuestionId, handleSelectOption}) => {
    const handleClick = () => {
        handleSelectOption(nextQuestionId)
    }
    return (
        <Button  variant="contained" onClick={handleClick}>
            {text}
        </Button>
    );
};

export default Option;