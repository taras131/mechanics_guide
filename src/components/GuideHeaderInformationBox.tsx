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
        <Grid xs={12} md={4}>
            <Card
                sx={{
                    minHeight: "90px",
                    padding: "5px 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start"
                }}>
                <Stack spacing={2} sx={{width: "100%"}}>
                    {title && (
                        <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={500}>
                            {title}
                        </Typography>
                    )}
                    {children}
                </Stack>
            </Card>
        </Grid>
    );
};

export default GuideHeaderInformationBox;