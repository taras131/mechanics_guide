import React, {FC} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {routes} from "../utils/routes";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";

interface INewGuideItemHeaderProps {

}

const NewGuideItemHeader: FC<INewGuideItemHeaderProps> = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    let prevItemId = 0
    if (bredCrumbs.length) prevItemId = bredCrumbs[bredCrumbs.length - 1].itemId
    const handleBackClick = () => {
        navigate(routes.new_guide + "/" + prevItemId)
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{}}
        >
            <Grid item>
                <Typography variant="h5" component="h2"> Этап № {bredCrumbs.length + 1}</Typography>
            </Grid>
            <Grid item>
                {bredCrumbs && bredCrumbs.length > 0 && (
                    <Button variant="contained"
                            onClick={handleBackClick}
                            color="secondary">
                        Назад
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default NewGuideItemHeader;