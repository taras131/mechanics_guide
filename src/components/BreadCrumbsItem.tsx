import React, {FC} from "react";
import {ListItemButton} from "@mui/material";
import {IBreadCrumb} from "../models/iBreadCrumbs";
import Grid from "@mui/material/Unstable_Grid2";
import {RIGHT, SECONDARY_TEXT_COLOR, START} from "../utils/const";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppDispatch} from "../hooks/redux";
import {cutBreadCrumbs} from "../services/reducers/breadCrumbs";

interface IBreadCrumbsItemProps extends IBreadCrumb {
    index: number
    guideId: string
}

const BreadCrumbsItem: FC<IBreadCrumbsItemProps> = ({questionText, answerText, index, questionId, guideId}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleListItemClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + questionId);
        dispatch(cutBreadCrumbs(index));
    };
    return (
        <ListItemButton key={index}
                        sx={{width: "100%"}}
                        onClick={handleListItemClick}>
            <Grid container sx={{width: "100%", minHeight: "30px"}} alignItems={START} spacing={1}>
                <Grid xs={12} sm={8} md={8}>
                    <Typography>
                        {`${index + 1}. ${questionText}`}
                    </Typography>
                </Grid>
                <Grid xs={12} sm={4} md={4}>
                    <Typography color={SECONDARY_TEXT_COLOR} fontWeight={500} textAlign={RIGHT}>
                        {answerText}
                    </Typography>
                </Grid>
            </Grid>
        </ListItemButton>
    );
};

export default BreadCrumbsItem;