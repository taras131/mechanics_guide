import React, {FC} from "react";
import {Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {routes} from "../utils/routes";

interface INavigation {
    anchorEl: null | HTMLElement,
    handleClose: () => void,
    open: boolean
}

const Navigation: FC<INavigation> = ({anchorEl, handleClose, open}) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <MenuItem onClick={handleClose}>
                <Link to={routes.main} style={{textDecoration: "none"}}>
                    Главная
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} >
                <Link to={routes.new_guide+"/0"} style={{textDecoration: "none"}}>
                    Новый гайд
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} >
                <Link to={routes.login} style={{textDecoration: "none"}}>
                    Auth
                </Link>
            </MenuItem>
        </Menu>
    );
};

export default Navigation;