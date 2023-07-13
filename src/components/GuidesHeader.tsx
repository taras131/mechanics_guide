import React, {FC} from 'react';
import GuidesHeaderAddNewGuide from "./GuidesHeaderAddNewGuide";
import GuidesHeaderSelectMyGuides from "./GuidesHeaderSelectMyGuides";
import SelectGuideCategory from "./SelectGuideCategory";
import Grid from "@mui/material/Grid";
import {SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth} from "../services/selectors/authSelector";

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
    const isAuth = useAppSelector(state => getIsAuth(state))
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
                    {isAuth && (
                        <Grid item>
                            <GuidesHeaderSelectMyGuides isSelectedMyGuides={isSelectedMyGuides}
                                                        handleMyGuideSelected={handleMyGuideSelected}/>
                        </Grid>
                    )}

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