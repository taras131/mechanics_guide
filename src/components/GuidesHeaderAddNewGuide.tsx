import React from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const GuidesHeaderAddNewGuide = () => {
    return (
        <Button variant="contained" fullWidth startIcon={<AddCircleOutlineOutlinedIcon />}>
            Добавить свой гайд
        </Button>
    );
};

export default GuidesHeaderAddNewGuide;