import React from 'react';
import Header from "./Header";
import {Routes, Route, Link} from "react-router-dom";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import {Container} from "@mui/material";
import Guide from "../pages/Guide";

const App = () => {
    return (
        <Container>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/auth"} element={<Auth/>}/>
                <Route path={"/guide/:guideId"} element={<Guide/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </Container>
    );
}

export default App;
