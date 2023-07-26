import React, {FC, useState} from 'react';
import {IGuide} from "../models/iGuide";
import Grid from '@mui/material/Unstable_Grid2';
import {CENTER, COLUMN, ROW, SPACE_BETWEEN, START, STRING_WITH_SPACE} from "../utils/const";
import GuideHeaderTitle from "./GuideHeaderTitle";
import GuideHeaderButtons from "./GuideHeaderButtons";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IGuideHeaderProps {
    isEdit: boolean,
    isNewGuide: boolean
    guide: IGuide
}

const GuideHeader: FC<IGuideHeaderProps> = ({isEdit, guide, isNewGuide}) => {
    const matches_900 = useMediaQuery('(min-width:900px)');
    const [titleError, setTitleError] = useState(STRING_WITH_SPACE)
    return (
        <Grid container
              spacing={matches_900 ? 1 : 3}
              alignItems={START}
              justifyContent={matches_900 ? SPACE_BETWEEN : CENTER}>
            <Grid xs={12} sm={12} md={8}>
                <GuideHeaderTitle guideTitle={guide.title}
                                  isEdit={isEdit}
                                  isNewGuide={isNewGuide}
                                  matches_900={matches_900}
                                  titleError={titleError}
                                  setTitleError={setTitleError}/>
            </Grid>
            <Grid xs={12} sm={12} md={4}>
                <GuideHeaderButtons guide={guide}
                                    isEdit={isEdit}
                                    isNewGuide={isNewGuide}
                                    matches_900={matches_900}
                                    titleError={titleError}/>
            </Grid>
        </Grid>
    );
};

export default GuideHeader;