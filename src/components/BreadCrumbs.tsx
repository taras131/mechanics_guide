import React, {FC} from 'react';
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
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Stack from "@mui/material/Stack";
import {useParams} from "react-router-dom";
import AccordionWithTitleAndCounter from "./AccordionWithTitleAndCounter";

interface IProps {
    expanded: string | false
    handleExpandedChange: any
}

const emptyMessage = "Список начнёт заполняться по мере вашего передвижения по гайду"

const BreadCrumbs: FC<IProps> = ({expanded, handleExpandedChange}) => {
    const guideId = useParams().guideId || "0";
    const breadCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const breadCrumbsList = breadCrumbs.map((crumb, index) => {
        return (<BreadCrumbsItem key={crumb.optionId} {...crumb} index={index} guideId={guideId}/>)
    })
    return (
        <AccordionWithTitleAndCounter title={"История ответов"}
                                      panelId={"panel1"}
                                      expanded={expanded}
                                      count={breadCrumbs.length}
                                      handleExpandedChange={handleExpandedChange}>
            <List
                sx={{bgcolor: 'background.paper'}}
                subheader={<li/>}
            >
                {breadCrumbsList.length > 0
                    ? breadCrumbsList
                    : emptyMessage}
            </List>
        </AccordionWithTitleAndCounter>
    );
};

export default BreadCrumbs;