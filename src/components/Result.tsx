import React, {FC} from 'react';
import {IResult} from "../models/guideInterface";
import Typography from "@mui/material/Typography";

const Result: FC<IResult> = ({id, text}) => {
    return (
        <Typography fontSize={"20px"} mt={"30px"}>
            {text}
        </Typography>
    );
};

export default Result;