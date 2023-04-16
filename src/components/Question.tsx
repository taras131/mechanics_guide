import React, {FC} from 'react';
import Option from "./Option";
import {Stack} from "@mui/material";
import {IGuideItem} from "../models/newGuideInterface";

interface IProps extends IGuideItem {
    handleSelectOption: (nextQuestionId: number) => void
}

const Question: FC<IProps> = ({
                                  id,
                                  text,
                                  options,
                                  handleSelectOption
                              }) => {
    const optionsList = options.map(item => <Option key={item.text}
                                                    {...item}
                                                    handleSelectOption={handleSelectOption}/>)
    return (
        <div>
            <h2>{text}</h2>
            <Stack spacing={2} direction="row">
                {optionsList}
            </Stack>
        </div>
    );
};

export default Question;