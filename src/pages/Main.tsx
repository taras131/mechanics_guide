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
    const matches_500 = useMediaQuery('(min-width:500px)');
    const matches_400 = useMediaQuery('(min-width:400px)');
    const handleGuidesClick = () => {
        navigate(routes.guides)
    }
    const handleRegisterClick = () => {
        navigate(routes.register)
    }
    return (
        <Grid container spacing={2}
              style={{
                  height: "calc(100vh - 85px)",
                  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${Image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  marginRight: 1,
                  marginLeft: 1,
                  marginTop: "-25px"
              }}>
            <Grid xs={12} sm={12} md={8}>
                <Stack alignItems={CENTER} justifyContent={CENTER} sx={{height: "100%"}} pl={3}>
                    <Typography variant={"h1"} color={"white"} fontWeight={600}
                                fontSize={matches_500 ? "44px" : "30px"}
                                letterSpacing={matches_500 ? "5px" : "4px"}>
                        Mechanics guide
                    </Typography>
                    <Typography mt={matches_500 ? 5 : 3} variant={"h3"} color={"white"} fontWeight={500}
                                fontSize={matches_500 ? "16px" : "14px"}
                                letterSpacing={"2px"} lineHeight={"30px"}>
                        Превращаем ремонт и обслуживание сложной техники в точную науку. Без смс и регистрации.
                    </Typography>
                    <Stack mt={matches_500 ? 10 : 1}
                           direction={matches_500 ? ROW : COLUMN}
                           spacing={1} alignItems={CENTER} justifyContent={SPACE_AROUND} sx={{width: "100%"}}>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <AddToQueueIcon sx={{color: "white"}}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Создавайте свои ветвящиеся гайды
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <EditIcon sx={{color: "white"}}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Улучшай свои гайды
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{width: "150px", minHeight: "100px"}}>
                            <Stack spacing={2} alignItems={CENTER} justifyContent={START} sx={{height: "100%"}}>
                                <ChatBubbleIcon sx={{color: "white"}}/>
                                <Typography color={"white"} textAlign={CENTER}>
                                    Делись опытом в коментариях
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack mt={matches_500 ? 10 : 2} direction={matches_400 ? ROW : COLUMN}
                           spacing={matches_400 ? 1 : 4}
                           alignItems={CENTER}
                           justifyContent={SPACE_AROUND}
                           sx={{width: "100%"}}>
                        <Button onClick={handleGuidesClick} startIcon={<ArticleIcon/>} variant={"contained"}>К
                            гайдам</Button>
                        <Button onClick={handleRegisterClick} startIcon={<LoginIcon/>}
                                variant={"contained"}>Регистрация</Button>
                    </Stack>
                </Stack>
            </Grid>
            <Grid xs={0} sm={2} md={4}>
                <Stack alignItems={CENTER} justifyContent={CENTER} sx={{height: "100%"}}>

                </Stack>
            </Grid>
        </Grid>
    );
};

export default Main;