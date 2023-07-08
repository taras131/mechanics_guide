import React from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {EDITION_GUIDE_ID} from "../utils/const";
import {useAppDispatch} from "../hooks/redux";
import {emptyGuide, setEditionGuide, setIsNewGuideEdition} from "../services/reducers/guides";

const GuidesHeaderAddNewGuide = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleAddNewGuideClick = () => {
        dispatch(setEditionGuide(emptyGuide))
        dispatch(setIsNewGuideEdition(true))
        navigate(routes.guide+"/"+EDITION_GUIDE_ID+"/0")
    }
    return (
        <Button onClick={handleAddNewGuideClick}
                variant="contained"
                fullWidth
                startIcon={<AddCircleOutlineOutlinedIcon/>}>
            Добавить свой гайд
        </Button>
    );
};

export default GuidesHeaderAddNewGuide;