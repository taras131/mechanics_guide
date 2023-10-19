import React, {useState} from "react";
import {ALL_CATEGORIES} from "../utils/const";
import {useAppSelector} from "../hooks/redux";
import {getGuidesWithFilter} from "../services/selectors/guidesSelectors";
import {SelectChangeEvent} from "@mui/material";
import Stack from "@mui/material/Stack";
import GuidesHeader from "../components/GuidesHeader";
import GuidesList from "../components/GuidesList";

const Guides = () => {
    const [selectedGuideCategoryId, setSelectedGuideCategoryId] = useState(ALL_CATEGORIES.id);
    const [isSelectedMyGuides, setIsSelectedMyGuides] = useState(false);
    const guides = useAppSelector(state => getGuidesWithFilter(state, selectedGuideCategoryId, isSelectedMyGuides));
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        setSelectedGuideCategoryId(e.target.value as string);
    };
    const handleMyGuideSelected = () => {
        setIsSelectedMyGuides(prev => !prev);
    };
    return (
        <Stack spacing={2}>
            <GuidesHeader selectedGuideCategoryId={selectedGuideCategoryId}
                          isSelectedMyGuides={isSelectedMyGuides}
                          handleGuideCategoryChange={handleGuideCategoryChange}
                          handleMyGuideSelected={handleMyGuideSelected}/>
            <GuidesList guides={guides}/>
        </Stack>
    );
};

export default Guides;