import React, {FC} from 'react';
import {IGuide} from "../models/iGuide";
import GuidePreview from "./GuidePreview";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import {SECONDARY_TEXT_COLOR} from "../utils/const"; // Grid version 2

interface IGuidesListProps {
    guides: IGuide []
}

const GuidesList: FC<IGuidesListProps> = ({guides}) => {
    const guidesList = guides.map(guide => (<GuidePreview key={guide.id} guide={guide}/>))
    return (
        <Grid container spacing={2}>
            {guidesList.length
                ? guidesList
                : (
                    <Typography fontSize={"16px"} fontWeight={500} color={SECONDARY_TEXT_COLOR}>
                        Пока нет гайдов , отвечающих параметрам поиска, нажмите "Добавить свой гайд",
                        чтобы создать новый или измените параметры поиска
                    </Typography>
                )}
        </Grid>
    );
};

export default GuidesList;