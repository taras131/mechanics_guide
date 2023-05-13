import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from "./Navigation";
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth, getUser} from "../services/selectors/authSelector";

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isAuth = useAppSelector(state => getIsAuth(state))
    const user = useAppSelector(state => getUser(state))
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Navigation anchorEl={anchorEl}
                                handleClose={handleClose}
                                open={open}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Mechanics guide
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