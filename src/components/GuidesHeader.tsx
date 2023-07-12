import React, {FC} from 'react';
import GuidesHeaderAddNewGuide from "./GuidesHeaderAddNewGuide";
import GuidesHeaderSelectMyGuides from "./GuidesHeaderSelectMyGuides";
import SelectGuideCategory from "./SelectGuideCategory";
import Grid from "@mui/material/Grid";
import {SelectChangeEvent} from "@mui/material";

interface IGuidesHeaderProps {
    selectedGuideCategoryId: string
    isSelectedMyGuides: boolean
    handleGuideCategoryChange: (e: SelectChangeEvent) => void
    handleMyGuideSelected: () => void
}

const GuidesHeader: FC<IGuidesHeaderProps> = ({
                                                  selectedGuideCategoryId,
                                                  isSelectedMyGuides,
                                                  handleGuideCategoryChange,
                                                  handleMyGuideSelected
                                              }) => {
    return (
        <Grid container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}>
            <Grid item>
                <GuidesHeaderAddNewGuide/>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <GuidesHeaderSelectMyGuides isSelectedMyGuides={isSelectedMyGuides}
                                                    handleMyGuideSelected={handleMyGuideSelected}/>
                    </Grid>
                    <Grid item>
                        <SelectGuideCategory selectedGuideCategoryId={selectedGuideCategoryId}
                                             handleGuideCategoryChange={handleGuideCategoryChange}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GuidesHeader;