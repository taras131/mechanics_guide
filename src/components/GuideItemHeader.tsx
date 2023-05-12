import React, {FC} from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";

interface IGuideItemHeaderProps {
    guideId: string
}

const GuideItemHeader: FC<IGuideItemHeaderProps> = ({guideId}) => {
    const dispatch = useAppDispatch()
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    let prevItemId = 0
    if (bredCrumbs.length) prevItemId = bredCrumbs[bredCrumbs.length - 1].itemId
    const handleBackClick = () => {
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{width: '100%'}}
        >
            <Grid item>
                <Typography variant="h5" component="h2" fontWeight={600}>
                    Этап № {bredCrumbs.length + 1}
                </Typography>
            </Grid>
            {bredCrumbs && bredCrumbs.length > 0 && (
                <Grid item>
                    <Link to={`/guide/${guideId}/${prevItemId}`}>
                        <Button variant="outlined"
                                onClick={handleBackClick}>
                            Назад
                        </Button>
                    </Link>
                </Grid>
            )}
        </Grid>
    );
};

export default GuideItemHeader;