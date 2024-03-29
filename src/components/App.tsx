import React, {useEffect} from "react";
import Header from "./Header";
import {Routes, Route} from "react-router-dom";
import Main from "../pages/Main";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import {Container} from "@mui/material";
import Guide from "../pages/Guide";
import {routes} from "../utils/routes";
import Box from "@mui/material/Box";
import Profile from "../pages/Profile";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {setGuideCategories, setGuides, setIsGuidesLoading} from "../services/reducers/guides";
import {IGuide, IGuideCategory} from "../models/iGuide";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {geiIsGuidesLoading} from "../services/selectors/guidesSelectors";
import Preloader from "./Preloader";
import Message from "./Message";
import Guides from "../pages/Guides";

const App = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => geiIsGuidesLoading(state));
    useEffect(() => {
        const q = query(collection(db, "guides"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setIsGuidesLoading(true));
                const guidesArr: IGuide [] = [];
                querySnapshot.forEach((doc: any) => {
                    guidesArr.push({...doc.data(), id: doc.id, items: JSON.parse(doc.data().items)});
                });
                dispatch(setGuides(guidesArr));
                dispatch(setIsGuidesLoading(false));
            } catch (e) {
                dispatch(setIsGuidesLoading(false));
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    useEffect(() => {
        const q = query(collection(db, "guide_categories"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setIsGuidesLoading(true));
                const categoriesArr: IGuideCategory [] = [];
                querySnapshot.forEach((doc: any) => {
                    categoriesArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setGuideCategories(categoriesArr));
                dispatch(setIsGuidesLoading(false));
            } catch (e) {
                dispatch(setIsGuidesLoading(false));
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    if (isLoading) return (<Preloader/>);
    return (
        <Container sx={{padding: "5px"}}>
            <Header/>
            <Box mt={3}>
                <Routes>
                    <Route path={routes.main} element={<Main/>}/>
                    <Route path={routes.guides} element={<Guides/>}/>
                    <Route path={routes.login} element={<Auth/>}/>
                    <Route path={routes.register} element={<Auth/>}/>
                    <Route path={routes.guide + "/:guideId/:stepId"} element={<Guide/>}/>
                    <Route path={routes.profile} element={<Profile/>}/>
                    <Route path={routes.not_found} element={<NotFound/>}/>
                </Routes>
            </Box>
            <Message/>
        </Container>
    );
};

export default App;
