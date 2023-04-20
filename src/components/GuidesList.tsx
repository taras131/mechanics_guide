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
    if (isLoading) return (<Preloader/>)
    const guidesList = guides.map(item => {
        if (item && item.id) {
            return (
                <Grid item sm={4} md={3} xs={12} key={item.title}>
                    <Link to={`/guide/${item.id}/0`} style={{textDecoration: "none"}}>
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Typography fontSize={"16px"}>
                                    {item.title}
                                </Typography>
                                <Typography fontSize={"12px"} marginTop="10px">
                                    Категория: {item.category}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            )
        } else {
            return (
                <Grid item xs={3} key="null">

                </Grid>
            )
        }
    })
    return (
        <>
            {guidesList}
        </>
    );
};

export default GuidesList;