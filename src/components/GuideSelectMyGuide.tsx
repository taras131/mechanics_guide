import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {geiIsSelectedMyGuide} from "../services/selectors/guidesSelectors";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {toggleIsSelectedMyGuide} from "../services/reducers/guides";

const GuideSelectMyGuide = () => {
    const dispatch = useAppDispatch()
    const isSelectedMyGuide = useAppSelector(state => geiIsSelectedMyGuide(state))
    const handleCheckBoxChange = () => {
        dispatch(toggleIsSelectedMyGuide())
    }
    return (
        <FormControlLabel
            control={<Checkbox checked={isSelectedMyGuide}
                               onChange={handleCheckBoxChange}/>} label="Мои гайды" />
    );
};

export default GuideSelectMyGuide;