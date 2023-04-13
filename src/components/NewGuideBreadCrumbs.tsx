import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/newGuideSelectors";
import {
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";


const NewGuideBreadCrumbs = () => {
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const breadCrumbsList = breadCrumbs.map(item => (
        <TableRow
            key={item.text}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {item.text}
            </TableCell>
            <TableCell align="right">{item.answer}</TableCell>

        </TableRow>))
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Вопрос</TableCell>
                        <TableCell align="right">Ответ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {breadCrumbsList}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default NewGuideBreadCrumbs;