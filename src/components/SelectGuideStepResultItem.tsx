import React, {FC} from 'react';
import {ListItem, ListItemText} from "@mui/material";
import {IGuideItem} from "../models/iGuide";

interface ISelectGuideStepResultItemProps {
    index: number
    result: IGuideItem
}

const SelectGuideStepResultItem: FC<ISelectGuideStepResultItemProps> = ({index, result}) => {
    return (
        <ListItem key={result.id}>
            <ListItemText primary={`${index + 1}. ${result.text}`}/>
        </ListItem>
    );
};

export default SelectGuideStepResultItem;