import React, {useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {ALL_CATEGORIES} from "../utils/const";
import GuidesList from "../components/GuidesList";
import GuidesHeader from "../components/GuidesHeader";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {SelectChangeEvent} from "@mui/material";

const Main = () => {
    const dispatch = useAppDispatch()
    const [selectedGuideCategoryId, setSelectedGuideCategoryId] = useState(ALL_CATEGORIES.id)
    const [isSelectedMyGuides, setIsSelectedMyGuides] = useState(false)

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
            <GuidesList/>
        </Stack>
    );
};

export default Main;