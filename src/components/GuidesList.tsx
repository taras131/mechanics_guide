import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../hooks/redux";
import {geiIsGuidesLoading, getAllGuides} from "../services/selectors/guidesSelectors";
import Preloader from "./Preloader";

const GuidesList = () => {
    const guides = useAppSelector(state => getAllGuides(state))
    const isLoading = useAppSelector(state => geiIsGuidesLoading(state))
    const guidesList = guides.map(item => {
        return (
            <Grid item xs={3}>
                <Link to={`/guide/${item.id}`}>
                    <Card sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography fontSize={"16px"}>
                                {item.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>
        )
    })
    if (isLoading) return (<Preloader/>)
    return (
        <>
            {guidesList}
        </>
    );
};

export default GuidesList;