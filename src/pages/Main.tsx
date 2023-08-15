import React from 'react';
import {ALL_CATEGORIES, CENTER, COLUMN, ROW, SPACE_AROUND, START} from "../utils/const";
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Image from "../img/desctop_2.jpg";
import {Paper} from "@mui/material";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LoginIcon from '@mui/icons-material/Login';
import ArticleIcon from '@mui/icons-material/Article';
import useMediaQuery from "@mui/material/useMediaQuery";
import {routes} from "../utils/routes";

const Main = () => {
    const navigate = useNavigate()
    const matches_580 = useMediaQuery('(min-width:580px)');
    const matches_400 = useMediaQuery('(min-width:400px)');
    const handleGuidesClick = () => {
        navigate(routes.guides)
    }
    const handleLoginClick = () => {
        navigate(routes.login)
    }
    return (
        <Grid container spacing={2}
              style={{
                  height: "calc(100vh - 85px)",
                  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${Image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  marginRight: 1,
                  marginLeft: 1,
                  marginTop: "-25px",
                  padding: "20px"
              }}>
            <Grid xs={12} sm={12} md={8}>
                <Stack alignItems={CENTER} justifyContent={CENTER} sx={{height: "100%"}} pl={3}>
                    <Typography variant={"h1"} color={"white"} fontWeight={700}
                                fontSize={matches_580 ? "64px" : "50px"}
                                letterSpacing={matches_580 ? "5px" : "4px"} textAlign={CENTER}
                                fontFamily={"Rajdhani"}>
                        Mechanics guide
                    </Typography>
                    <Typography mt={matches_580 ? 3 : 2} variant={"h3"} color={"white"} fontWeight={400}
                                fontSize={matches_580 ? "30px" : "24px"}
                                letterSpacing={"2px"} lineHeight={"35px"} textAlign={CENTER} fontFamily={"Rubik Dirt"}>
                        Превращаем ремонт и обслуживание сложной техники в точную науку.
                    </Typography>
                    <Stack mt={matches_580 ? 6 : 3}
                           direction={matches_580 ? ROW : COLUMN}
                           spacing={matches_580 ? 3 : 1} alignItems={CENTER} justifyContent={CENTER}
                           sx={{width: "100%"}}>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <AddToQueueIcon sx={{color: "white"}} fontSize={"large"}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Создавайте свои ветвящиеся гайды
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <EditIcon sx={{color: "white"}} fontSize={"large"}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Улучшай свои гайды
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <ChatBubbleIcon sx={{color: "white"}} fontSize={"large"}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Делись опытом в коментариях
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack mt={matches_580 ? 6 : 3} direction={matches_400 ? ROW : COLUMN}
                           spacing={matches_400 ? 1 : 4}
                           alignItems={CENTER}
                           justifyContent={SPACE_AROUND}
                           sx={{width: "100%"}}>
                        <Button onClick={handleGuidesClick} variant={"contained"}
                                size="large">
                            <Typography fontSize={"24px"} fontWeight={400} fontFamily={"Rubik Dirt"}>
                                Перейти к гайдам
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Grid>

        </Grid>
    );
};

export default Main;