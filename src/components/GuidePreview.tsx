import React, {FC} from 'react';
import {Card, CardContent, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {IGuide} from "../models/guideInterface";

const GuidePreview: FC<IGuide> = ({title, id, category}) => {
    return (
        <Grid item xs={1} sm={4} md={3}>
            <Link to={`/guide/${id}/0`} style={{textDecoration: "none"}}>
                <Card>
                    <CardContent>
                        <Typography fontSize={"16px"} fontWeight={700}>
                            {title}
                        </Typography>
                        <Typography fontSize={"12px"} marginTop="10px">
                            Категория: {category}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

export default GuidePreview;