import React from 'react';
import {guides} from "../utils/const";
import {Card, CardContent, Grid, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";


const Main = () => {
    const guidesOverview = guides.map(item => {
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
    return (
        <Grid container spacing={2}>
            {guidesOverview}
        </Grid>
    );
};

export default Main;