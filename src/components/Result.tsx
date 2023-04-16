import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {IGuideItem} from "../models/newGuideInterface";

const Result: FC<IGuideItem> = ({id, text}) => {
    return (
        <>
            <Typography fontSize={"25px"} mt={"30px"}>
                Результат
            </Typography>
            <Typography fontSize={"20px"} mt={"30px"}>
                {text}
            </Typography>
        </>
    );
};

export default Result;