import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {geiIsGuidesLoading, getGuidesByCategory} from "../services/selectors/guidesSelectors";
import Preloader from "./Preloader";
import GuidePreview from "./GuidePreview";
import GuidesPreviewEmpty from "./GuidesPreviewEmpty";
import {Grid} from "@mui/material";

interface IGuidesPreviewListProps {
    currentCategory: string
}

const GuidesPreviewList: FC<IGuidesPreviewListProps> = ({currentCategory}) => {
    const guides = useAppSelector(state => getGuidesByCategory(state, currentCategory))
    const isLoading = useAppSelector(state => geiIsGuidesLoading(state))
    if (isLoading) return (<Preloader/>)
    if (guides.length === 0) return (<GuidesPreviewEmpty/>)
    const guidesList = guides.map(guide => (<GuidePreview key={guide.id} {...guide}/>))
    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 8, md: 12}} style={{marginTop: "20px"}}>
            {guidesList}
        </Grid>
    );
};

export default GuidesPreviewList;