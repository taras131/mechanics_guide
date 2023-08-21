import React from 'react';
import {CENTER, COLUMN, GUIDE_MODE, LEFT, ROW, SECONDARY_TEXT_COLOR, SPACE_AROUND, START} from "../utils/const";
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import useMediaQuery from "@mui/material/useMediaQuery";
import {routes} from "../utils/routes";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import warning from "react-redux/es/utils/warning";


const Main = () => {
    const navigate = useNavigate()
    const matches_580 = useMediaQuery('(min-width:580px)');
    const matches_400 = useMediaQuery('(min-width:400px)');
    const handleNewGuideClick = () => {
        navigate(routes.guide + "/" + GUIDE_MODE.new_guide + "/0")
    }
    const handleGuidesClick = () => {
        navigate(routes.guides)
    }
    return (
        <Stack spacing={3} alignItems={CENTER} justifyContent={CENTER}
               style={{
                   height: "calc(100vh - 115px)",
                   marginTop: "-25px",
                   padding: "10px"
               }}>
            <Stack alignItems={CENTER} justifyContent={CENTER} sx={{height: "100%"}} pl={matches_580 ? 3 : 0}>
                <Box sx={{width: "100%"}}>
                    <Typography color="#8B0000" textAlign={LEFT} fontWeight={400} fontSize={"20px"}
                                letterSpacing={"5px"}
                                fontFamily={"Rubik Dirt"}>
                        Учись, думай, делай.
                    </Typography>
                </Box>

                <Typography variant={"h1"} color={"primary"} fontWeight={400} mt={10}
                            fontSize={matches_580 ? "64px" : "35px"}
                            letterSpacing={matches_580 ? "5px" : "3px"} textAlign={CENTER}
                            fontFamily={"Rubik Dirt"}>
                    Troubleshooting
                </Typography>
                <Typography mt={matches_580 ? 3 : 2}
                            variant={"h3"}
                            color={"primary"} fontWeight={400}
                            fontSize={matches_580 ? "30px" : "20px"}
                            letterSpacing={"2px"} lineHeight={matches_580 ? "35px" : "25px"}
                            textAlign={CENTER} fontFamily={"Rubik Dirt"}>
                    Поиск неисправностей
                    в рабочих системах машин.
                </Typography>
                <Typography fontSize={"16px"} mt={5} textAlign={LEFT} color={SECONDARY_TEXT_COLOR}>
                    Добро пожаловать на наш сайт! У нас вы можете создавать и редактировать ветвящиеся гайды для
                    диагностики технических неисправностей. Создавайте подробные инструкции, добавляйте текст и
                    прикрепляйте файлы с документацией. Общайтесь с другими пользователями, чтобы расширить свои знания.
                </Typography>
                <Stack sx={{marginTop: 10}} alignItems={CENTER} justifyContent={CENTER} spacing={5}
                       direction={matches_580 ? ROW : COLUMN}>
                    <Button
                        onClick={handleNewGuideClick}
                        variant={"outlined"}
                        size="large">
                        <Typography fontSize={matches_580 ? "24px" : "16px"} fontWeight={400}
                                    fontFamily={"Rubik Dirt"}>
                            Создать гайд
                        </Typography>
                    </Button>
                    <Button
                        onClick={handleGuidesClick}
                        variant={"contained"}
                        size="large">
                        <Typography fontSize={matches_580 ? "24px" : "16px"} fontWeight={400}
                                    fontFamily={"Rubik Dirt"}>
                            Перейти к гайдам
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Main;