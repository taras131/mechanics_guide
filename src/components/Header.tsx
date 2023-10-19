import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth, getUser} from "../services/selectors/authSelector";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Person4Icon from "@mui/icons-material/Person4";
import LoginIcon from "@mui/icons-material/Login";
import {DIV, H6, INHERIT, NONE, STATIC, WHITE} from "../utils/const";
import HeaderMenu from "./HeaderMenu";

const loginButtonText = "Вход";

const Header = () => {
    const isAuth = useAppSelector(state => getIsAuth(state));
    const matches_700 = useMediaQuery("(min-width:700px)");
    const user = useAppSelector(state => getUser(state));
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position={STATIC}>
                <Toolbar>
                    <HeaderMenu isAuth={isAuth}/>
                    <Typography variant={H6} component={DIV} sx={{flexGrow: 1}} fontFamily={"Rajdhani"}
                                fontWeight={700}>
                        <Link to={routes.main} style={{color: WHITE, textDecoration: NONE}}>
                            Troubleshooting
                        </Link>
                    </Typography>
                    {isAuth && user && user.email && (
                        <Link to={routes.profile} style={{color: WHITE}}>
                            {matches_700
                                ? (<Button color={INHERIT} startIcon={<Person4Icon/>}>
                                    {user.email}
                                </Button>)
                                : (<IconButton color={INHERIT}>
                                    <Person4Icon/>
                                </IconButton>)}
                        </Link>
                    )}
                    {!isAuth && (
                        <Link to={routes.login} style={{color: WHITE}}>
                            {matches_700
                                ? (<Button color={INHERIT} startIcon={<LoginIcon/>}>
                                    {loginButtonText}
                                </Button>)
                                : (<IconButton color={INHERIT}>
                                    <LoginIcon/>
                                </IconButton>)}
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;