import React from 'react';
import Header from "./Header";
import {Routes, Route, Link} from "react-router-dom";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import {Container} from "@mui/material";
import Guide from "../pages/Guide";
import NewGuide from "../pages/NewGuide";
import {routes} from "../utils/routes";
import Box from "@mui/material/Box";

const App = () => {
    return (
        <Container>
            <Header/>
            <Box mt={"40px"}>
                <Routes>
                    <Route path={routes.main} element={<Main/>}/>
                    <Route path={routes.new_guide} element={<NewGuide/>}/>
                    <Route path={routes.auth} element={<Auth/>}/>
                    <Route path={routes.guide} element={<Guide/>}/>
                    <Route path={routes.not_found} element={<NotFound/>}/>
                </Routes>
            </Box>
        </Container>
    );
}

export default App;
