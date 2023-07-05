import React, {FC, useState} from 'react';
import AddNewGuide from "./AddNewGuide";
import SelectMyGuides from "./SelectMyGuides";
import SelectGuideCategory from "./SelectGuideCategory";
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
                <AddNewGuide/>
            </Grid>
            <Grid item>
                <SelectMyGuides isSelectedMyGuides={isSelectedMyGuides}
                                handleMyGuideSelected={handleMyGuideSelected}/>
            </Grid>
            <Grid item>
                <SelectGuideCategory selectedGuideCategoryId={selectedGuideCategoryId}
                                     handleGuideCategoryChange={handleGuideCategoryChange}/>
            </Grid>
        </Grid>
    );
};

export default GuidesHeader;