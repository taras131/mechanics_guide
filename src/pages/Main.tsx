import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ALL_CATEGORIES} from "../utils/const";
import GuidesList from "../components/GuidesList";
import GuidesHeader from "../components/GuidesHeader";
import Stack from '@mui/material/Stack';
import {SelectChangeEvent} from "@mui/material";
import {getGuidesWithFilter} from "../services/selectors/guidesSelectors";

const Main = () => {
    const [selectedGuideCategoryId, setSelectedGuideCategoryId] = useState(ALL_CATEGORIES.id)
    const [isSelectedMyGuides, setIsSelectedMyGuides] = useState(false)
    const guides = useAppSelector(state => getGuidesWithFilter(state, selectedGuideCategoryId, isSelectedMyGuides))
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        setSelectedGuideCategoryId(e.target.value as string)
    }
    const handleMyGuideSelected = () => {
        setIsSelectedMyGuides(prev => !prev)
    }
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

export default Main;