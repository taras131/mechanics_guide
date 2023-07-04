import React, {FC} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {FormGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ISelectMyGuidesProps {
    isSelectedMyGuides: boolean
    handleMyGuideSelected: () => void
}

const SelectMyGuides: FC<ISelectMyGuidesProps> = ({isSelectedMyGuides, handleMyGuideSelected}) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={isSelectedMyGuides}
                               onChange={handleMyGuideSelected}
                               sx={{'& .MuiSvgIcon-root': {fontSize: 38}}}/>}
            label="Мои гайды"/>
    );
};

export default SelectMyGuides;