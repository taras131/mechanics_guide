import React, {FC} from 'react';
import {Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

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
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>
                <Link to={"/"}>
                    Main
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to={"/auth"}>
                    Auth
                </Link>
            </MenuItem>
        </Menu>
    );
};

export default Navigation;