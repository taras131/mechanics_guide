import React, {FC} from 'react';
import {ListItem, ListItemText} from "@mui/material";

interface IProps {
    existingValue: string
    index: number
}

const AddNewStringValueModalListItem:FC<IProps> = ({existingValue,index }) => {
    return (
        <ListItem>
            <ListItemText primary={`${index + 1}. ${existingValue}`}/>
        </ListItem>
    );
};

export default AddNewStringValueModalListItem;