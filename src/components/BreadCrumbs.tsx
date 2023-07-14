import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {
    Accordion, AccordionDetails, AccordionSummary, List, Paper
} from "@mui/material";
import BreadCrumbsItem from "./BreadCrumbsItem";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";

const emptyMessage = "Список начнёт заполняться по мере вашего передвижения по гайду"

const BreadCrumbs = () => {
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const breadCrumbsList = breadCrumbs.map((crumb, index) => {
        return (<BreadCrumbsItem key={crumb.optionId} {...crumb} index={index}/>)
    })

    return (
        <Paper>
            <Accordion sx={{width: "100%"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{width: "100%"}}
                >
                    <Grid container alignItems="center" justifyContent="space-between"
                          sx={{width: "100%", padding: "15px 20px"}}>
                        <Typography fontWeight={500} fontSize={16}>История ответов</Typography>
                        {breadCrumbs.length > 0 && (
                            <Avatar sx={{
                                width: 24, height: 24, bgcolor: deepPurple[500], fontSize: "12px"
                            }}>
                                {breadCrumbs.length}
                            </Avatar>)}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                        sx={{bgcolor: 'background.paper'}}
                        subheader={<li/>}
                    >
                        {breadCrumbsList.length > 0
                            ? breadCrumbsList
                            : emptyMessage}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default BreadCrumbs;