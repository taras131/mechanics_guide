import React from 'react';
import Stack from "@mui/material/Stack";
import {CENTER, ROW} from "../utils/const";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const Logo = () => {
    return (
        <Stack direction={ROW} alignItems={CENTER}>
            <Box sx={{
                backgroundColor: "#1976d2",
                height: "40px",
                width: "40px",
                transform: "rotate(45deg)",
                zIndex: 200
            }}>

            </Box>
            <Grid alignItems={CENTER} justifyContent={CENTER}
                  sx={{
                      backgroundColor: '#1976d2',
                      borderTop: "1px solid white",
                      borderBottom: "1px solid white",
                      height: "56px",
                      width: "110px",
                      marginLeft: "-20px",
                      zIndex: 100
                  }}>
                <Typography color={"white"} fontSize={"35px"} ml={"37px"} mt={"2px"}
                            fontFamily={"Rajdhani"} fontWeight={700}>
                    VEGA
                </Typography>

            </Grid>
            <Box sx={{
                backgroundColor: '#1976d2',
                borderTop: "1px solid white",
                borderRight: "1px solid white",
                height: "39px",
                width: "39px",
                transform: "rotate(45deg)",
                marginLeft: "-20px"
            }}>

            </Box>
        </Stack>
    );
};

export default Logo;