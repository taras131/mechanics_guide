import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NewGuideHeader = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h4" component="h1">Новый гайд</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained">Сохранить Гайд</Button>
            </Grid>
        </Grid>
    );
};

export default NewGuideHeader;