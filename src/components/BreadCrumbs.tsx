import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {List} from "@mui/material";
import BreadCrumbsItem from "./BreadCrumbsItem";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import {useParams} from "react-router-dom";
import AccordionWithTitleCounterIcon from "./AccordionWithTitleCounterIcon";
import {PRIMARY} from "../utils/const";

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
        <AccordionWithTitleCounterIcon title={"История ответов"}
                                       panelId={"panel1"}
                                       expanded={expanded}
                                       count={breadCrumbs.length}
                                       handleExpandedChange={handleExpandedChange}
                                       icon={<ManageHistoryIcon color={PRIMARY}/>}>
            <List
                sx={{bgcolor: 'background.paper'}}
                subheader={<li/>}
            >
                {breadCrumbsList.length > 0
                    ? breadCrumbsList
                    : emptyMessage}
            </List>
        </AccordionWithTitleCounterIcon>
    );
};

export default BreadCrumbs;