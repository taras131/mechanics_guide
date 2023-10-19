import React, {FC, useState} from "react";
import {IGuide} from "../models/iGuide";
import Grid from "@mui/material/Unstable_Grid2";
import {CENTER, GUIDE_MODE, SPACE_BETWEEN, START, STRING_EMPTY, STRING_WITH_SPACE} from "../utils/const";
import GuideHeaderTitle from "./GuideHeaderTitle";
import GuideHeaderActions from "./GuideHeaderActions";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IGuideHeaderProps {
    guideMode: GUIDE_MODE
    guide: IGuide
}

const GuideHeader: FC<IGuideHeaderProps> = ({guide, guideMode}) => {
    const matches_900 = useMediaQuery("(min-width:900px)");
    const [titleError, setTitleError] = useState(guideMode === GUIDE_MODE.new_guide ? STRING_WITH_SPACE : STRING_EMPTY);
    return (
        <Grid container
              mt={1}
              spacing={matches_900 ? 3 : 2}
              alignItems={START}
              justifyContent={matches_900 ? SPACE_BETWEEN : CENTER}>
            <Grid xs={12} sm={12} md={8}>
                <GuideHeaderTitle guideTitle={guide.title}
                                  guideMode={guideMode}
                                  matches_900={matches_900}
                                  titleError={titleError}
                                  setTitleError={setTitleError}
                />
            </Grid>
            <Grid xs={12} sm={12} md={4}>
                <GuideHeaderActions guide={guide}
                                    guideMode={guideMode}
                                    matches_900={matches_900}
                                    titleError={titleError}/>
            </Grid>
        </Grid>
    );
};

export default GuideHeader;