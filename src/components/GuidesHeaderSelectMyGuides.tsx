import React, {FC, useId} from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ISelectMyGuidesProps {
    isSelectedMyGuides: boolean
    handleMyGuideSelected: () => void
}

const GuidesHeaderSelectMyGuides: FC<ISelectMyGuidesProps> = ({isSelectedMyGuides, handleMyGuideSelected}) => {
    const checkboxId = useId();
    return (
        <FormControlLabel
            control={<Checkbox checked={isSelectedMyGuides}
                               onChange={handleMyGuideSelected}
                               id={checkboxId}
                               sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}/>}
            label="Мои гайды"/>
    );
};

export default GuidesHeaderSelectMyGuides;