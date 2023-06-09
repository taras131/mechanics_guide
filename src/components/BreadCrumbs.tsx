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
    const breadCrumbsList = breadCrumbs.map((crumb, index) => {
        return (<BreadCrumbsItem key={crumb.optionId} {...crumb} index={index}/>)
    })
    return (
        <TableContainer component={Paper}>
            <Typography
                sx={{marginTop: "5px", marginLeft: "5px"}}
                variant="h6"
                id="tableTitle"
                align={"center"}
            >
                Дерево ответов
            </Typography>
            {breadCrumbs.length === 0
                ? (<Typography
                    align={"center"}
                    fontSize="14px"
                    fontWeight={400}
                    sx={{margin: "40px 0" }}
                >
                    Эта таблица будет заполняться по мере вашего продвижения по гайду
                </Typography>)
                : (<Table aria-label="simple table">
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
                </Table>)}

        </TableContainer>

    );
};

export default BreadCrumbs;