import React, {FC} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface IGuideHeaderInformationBoxProps {
    title: string,
    children: React.ReactNode
}

const GuideHeaderInformationBox: FC<IGuideHeaderInformationBoxProps> = ({title, children}) => {
    return (
        <Card sx={{minHeight: "60px", padding: "15px"}}>
            <Stack spacing={2}>
                <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={500}>
                    {title}
                </Typography>
                {children}
            </Stack>
        </Card>
    );
};

export default GuideHeaderInformationBox;