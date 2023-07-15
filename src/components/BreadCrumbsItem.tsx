import React, {FC} from 'react';
import {Divider, ListItem, ListItemButton, ListItemText, Stack, TableCell, TableRow} from "@mui/material";
import {IBreadCrumb} from "../models/iBreadCrumbs";

interface IBreadCrumbsItemProps extends IBreadCrumb {
    index: number
}

const BreadCrumbsItem: FC<IBreadCrumbsItemProps> = ({questionText, answerText, index}) => {
    return (
        <>
            <Divider variant="inset" component="li"/>
            <ListItem key={index}
                      sx={{width: "100%"}}
                      onClick={() => {
                      }}
                      secondaryAction={
                          <ListItemText primary={answerText}/>
                      }
            >
                <ListItemText primary={`${index + 1}. ${questionText}`}/>
            </ListItem>

        </>
    );
};

export default BreadCrumbsItem;