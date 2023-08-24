import React, {FC} from "react";
import {List} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import AddNewStringValueModalListItem from "./AddNewStringValueModalListItem";

interface IProps {
    existingValues: string []
    listSubHeaderText: string
}

const listStyles = {
    bgcolor: 'background.paper',
    maxHeight: 300,
    maxWidth: 390,
    overflow: 'auto',
    position: 'relative',
    width: '100%',
    '& ul': {padding: 0},
}

const AddNewStringValueModalList: FC<IProps> = ({
                                                                        existingValues,
                                                                        listSubHeaderText
                                                                    }) => {
    const categoriesList = existingValues.map((existingValue, index) => {
        return (<AddNewStringValueModalListItem key={existingValue + "_" + index}
                                                existingValue={existingValue}
                                                index={index}/>)
    })
    return (
        <List subheader={<li/>} sx={listStyles}>
            <ListSubheader>{listSubHeaderText}</ListSubheader>
            {categoriesList}
        </List>
    );
};

export default AddNewStringValueModalList;