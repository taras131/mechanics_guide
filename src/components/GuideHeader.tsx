import React, {FC} from 'react';
import {IGuide} from "../models/iGuide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import GuideHeaderInformationBox from "./GuideHeaderInformationBox";
import {useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategoryNameById} from "../services/selectors/guidesSelectors";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

const GuideHeader: FC<IGuide> = ({id, title, authorId, categoryId}) => {
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, categoryId))
    const countSteps = useAppSelector(state => getCountGuideSteps(state, id))
    const navigate = useNavigate()
    const handleBackClick = () => {
        navigate(routes.main)
    }
    return (
        <Box>
            <Grid container spacing={2} columns={12} alignItems="center" justifyContent="space-between" mt={3}>
                <Grid xs={8} sm={8} md={8}>
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid>
                    <ButtonGroup>
                        <Button variant="contained">Редактировать</Button>
                        <Button onClick={handleBackClick}>На главную</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Box sx={{marginTop: 3}}>
                <Grid container spacing={{xs: 4, md: 6}} columns={{xs: 3, sm: 8, md: 12}}>
                    <GuideHeaderInformationBox title={"Автор"}>
                        <Typography fontWeight={600}>
                            {authorId ? authorId : "Автор неизвестен"}
                        </Typography>
                    </GuideHeaderInformationBox>
                    <GuideHeaderInformationBox title={"Категория"}>
                        <Typography fontWeight={600}>
                            {categoryName}
                        </Typography>
                    </GuideHeaderInformationBox>
                    <GuideHeaderInformationBox title={"Количество шагов"}>
                        <Typography fontWeight={600}>
                            {countSteps}
                        </Typography>
                    </GuideHeaderInformationBox>
                </Grid>
            </Box>
        </Box>
    );
};

export default GuideHeader;