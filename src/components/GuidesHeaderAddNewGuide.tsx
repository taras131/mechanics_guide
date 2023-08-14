import React from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {GUIDE_MODE} from "../utils/const";

const GuidesHeaderAddNewGuide = () => {
    const navigate = useNavigate()
    const handleAddNewGuideClick = () => {
        navigate(routes.guide + "/" + GUIDE_MODE.new_guide + "/0")
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