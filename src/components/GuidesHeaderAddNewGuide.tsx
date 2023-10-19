import React from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {GUIDE_MODE} from "../utils/const";
import Typography from "@mui/material/Typography";

const GuidesHeaderAddNewGuide = () => {
    const navigate = useNavigate();
    const handleAddNewGuideClick = () => {
        navigate(routes.guide + "/" + GUIDE_MODE.new_guide + "/0");
    };
    return (
        <Button onClick={handleAddNewGuideClick}
                variant="contained"
                size={"large"}
                fullWidth
                startIcon={<AddCircleOutlineOutlinedIcon/>}>
            <Typography fontWeight={400} fontFamily={"Rubik Dirt"}>
                Добавить свой гайд
            </Typography>
        </Button>
    );
};

export default GuidesHeaderAddNewGuide;