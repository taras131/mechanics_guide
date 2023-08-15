import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Menu, MenuItem} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";

interface IProps {
    isAuth: boolean
}

const HeaderMenu: FC<IProps> = ({isAuth}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={routes.main} style={{textDecoration: "none", color: "black"}}>
                        Главная
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to={routes.guides} style={{textDecoration: "none", color: "black"}}>
                        Гайды
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {isAuth
                        ? (<Link to={routes.profile} style={{textDecoration: "none", color: "black"}}>
                            Профиль
                        </Link>)
                        : (<Link to={routes.login} style={{textDecoration: "none", color: "black"}}>
                            Войти
                        </Link>)}

                </MenuItem>
            </Menu>
        </>
    );
};

export default HeaderMenu;