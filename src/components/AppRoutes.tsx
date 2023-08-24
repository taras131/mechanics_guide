import React from "react";
import {Route, Routes} from "react-router-dom";
import Auth from "../pages/Auth";
import Guide from "../pages/Guide";
import Guides from "../pages/Guides";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import {routes} from "../utils/routes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.main} element={<Main/>}/>
            <Route path={routes.guides} element={<Guides/>}/>
            <Route path={routes.login} element={<Auth/>}/>
            <Route path={routes.register} element={<Auth/>}/>
            <Route path={routes.guide + "/:guideId/:stepId"} element={<Guide/>}/>
            <Route path={routes.profile} element={<Profile/>}/>
            <Route path={routes.not_found} element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRoutes;