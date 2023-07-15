import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth, getUser} from "../services/selectors/authSelector";

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isAuth = useAppSelector(state => getIsAuth(state))
    const user = useAppSelector(state => getUser(state))
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to={routes.main} style={{color: "white", textDecoration: "none"}}>
                            Mechanics guide
                        </Link>
                    </Typography>

                    {isAuth && user && user.email && (
                        <Link to={routes.profile} style={{color: "white"}}>
                            <Button color="inherit">
                                {user.email}
                            </Button>
                        </Link>
                    )}
                    {!isAuth && (
                        <Link to={routes.login} style={{color: "white"}}>
                            <Button color="inherit">
                                Вход
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;