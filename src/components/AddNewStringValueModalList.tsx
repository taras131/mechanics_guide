import React, {FC} from 'react';
import {List} from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import AddNewStringValueModalListItem from "./AddNewStringValueModalListItem";

interface IAddNewValueModalListProps {
    existingValues: string []
    listSubHeaderText: string
}

const listStyles = {
    width: '100%',
    maxWidth: 390,
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': {padding: 0},
}

const AddNewStringValueModalList: FC<IAddNewValueModalListProps> = ({
                                                                        existingValues,
                                                                        listSubHeaderText
                                                                    }) => {
    const categoriesList = existingValues.map((existingValue, index) => {
        return (<AddNewStringValueModalListItem key={existingValue + "_" + index}
                                                existingValue={existingValue}
                                                index={index}/>)
    })
    return (
        <List
            sx={listStyles}
            subheader={<li/>}
        >
            <ListSubheader>{listSubHeaderText}</ListSubheader>
            {categoriesList}
        </List>
    );
};

export default AddNewStringValueModalList;