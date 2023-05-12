import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import BreadCrumbsItem from "./BreadCrumbsItem";
import Typography from "@mui/material/Typography";


const BreadCrumbs = () => {
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const breadCrumbsList = breadCrumbs.map(crumb => (<BreadCrumbsItem key={crumb.itemId} {...crumb}/>))
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography fontWeight={600}>
                                Вопрос
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography fontWeight={600}>
                                Ответ
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {breadCrumbsList}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default BreadCrumbs;