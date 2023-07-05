import React, {FC, useState} from 'react';
import GuidesHeaderAddNewGuide from "./GuidesHeaderAddNewGuide";
import GuidesHeaderSelectMyGuides from "./GuidesHeaderSelectMyGuides";
import GuidesHeaderSelectGuideCategory from "./GuidesHeaderSelectGuideCategory";
import Grid from "@mui/material/Grid";
import {ALL_CATEGORIES} from "../utils/const";
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
                <GuidesHeaderSelectMyGuides isSelectedMyGuides={isSelectedMyGuides}
                                            handleMyGuideSelected={handleMyGuideSelected}/>
            </Grid>
            <Grid item>
                <GuidesHeaderSelectGuideCategory selectedGuideCategoryId={selectedGuideCategoryId}
                                                 handleGuideCategoryChange={handleGuideCategoryChange}/>
            </Grid>
        </Grid>
    );
};

export default GuidesHeader;