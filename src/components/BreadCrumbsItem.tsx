import React, {FC} from 'react';
import {Stack, TableCell, TableRow} from "@mui/material";
import {IBreadCrumb} from "../services/reducers/breadCrumbs";
import Typography from "@mui/material/Typography";

interface IBreadCrumbsItemProps extends IBreadCrumb {
    index: number
}

const BreadCrumbsItem: FC<IBreadCrumbsItemProps> = ({questionText, answerText, index}) => {
    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">
                <Stack direction="row" spacing={2}>
                    <Typography fontWeight={600}>{index + 1}.</Typography>
                    <Typography fontWeight={400}>{questionText}</Typography>
                </Stack>
            </TableCell>
            <TableCell align="right">{answerText}</TableCell>
        </TableRow>
    );
};

export default BreadCrumbsItem;