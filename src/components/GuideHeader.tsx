import React, {FC} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

interface IGuideHeaderProps {
    title: string
}

const GuideHeader: FC<IGuideHeaderProps> = ({title}) => {
    const navigate = useNavigate()
    const handleOnMainClick = () => {
        navigate(routes.main)
    }
    return (
        <div>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4" component="h1">{title}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleOnMainClick}>На главную</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default GuideHeader;