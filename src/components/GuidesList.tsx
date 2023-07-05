import React, {FC} from 'react';
import {IGuide} from "../models/iGuide";
import GuidePreview from "./GuidePreview";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

interface IGuidesListProps {
    guides: IGuide []
}

const GuidesList: FC<IGuidesListProps> = ({guides}) => {
    const guidesList = guides.map(guide => (<GuidePreview key={guide.id} guide={guide}/>))
    return (
        <Grid container spacing={2}>
            {guidesList.length
                ? guidesList
                : "Пока нет гайдов , отвечающих параметрам поиска, нажмите добавить, чтобы создать новый"}
        </Grid>
    );
};

export default GuidesList;