import React, {FC} from "react";
import GuidesHeaderAddNewGuide from "./GuidesHeaderAddNewGuide";
import GuidesHeaderSelectMyGuides from "./GuidesHeaderSelectMyGuides";
import SelectGuideCategory from "./SelectGuideCategory";
import {SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth} from "../services/selectors/authSelector";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";

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
                                                  handleMyGuideSelected,
                                              }) => {
    const isAuth = useAppSelector(state => getIsAuth(state));
    const matches_730 = useMediaQuery("(min-width:730px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    return (
        <Grid container
              direction={matches_730 ? "row" : "column"}
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
              sx={{padding: "20px 0"}}>
            <Grid>
                <GuidesHeaderAddNewGuide/>
            </Grid>
            <Grid>
                <Grid container direction={matches_500 ? "row" : "column"} spacing={2} alignItems="center">
                    {isAuth && (<Grid>
                        <GuidesHeaderSelectMyGuides isSelectedMyGuides={isSelectedMyGuides}
                                                    handleMyGuideSelected={handleMyGuideSelected}/>
                    </Grid>)}
                    <Grid>
                        <SelectGuideCategory selectedGuideCategoryId={selectedGuideCategoryId}
                                             handleGuideCategoryChange={handleGuideCategoryChange}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GuidesHeader;