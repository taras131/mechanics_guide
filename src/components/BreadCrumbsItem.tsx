import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {IBreadCrumb} from "../services/reducers/breadCrumbs";

const BreadCrumbsItem: FC<IBreadCrumb> = ({text, answer}) => {
    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">
                {text}
            </TableCell>
            <TableCell align="right">{answer}</TableCell>
        </TableRow>
    );
};

export default BreadCrumbsItem;