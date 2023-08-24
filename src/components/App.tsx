import React, {useEffect} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {Container} from "@mui/material";
import AppRoutes from "./AppRoutes";
import Box from "@mui/material/Box";
import Header from "./Header";
import Message from "./Message";
import Preloader from "./Preloader";
import {getIsGuidesLoading} from "../services/selectors/guidesSelectors";
import {setGuideCategories, setGuides, setIsGuidesLoading} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IGuide, IGuideCategory} from "../models/iGuide";
import {apiRoutes} from "../utils/routes";

const App = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => getIsGuidesLoading(state))
    useEffect(() => {
        const q = query(collection(db, apiRoutes.guides));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setIsGuidesLoading(true))
                let guidesArr: IGuide [] = []
                querySnapshot.forEach((doc: any) => {
                    guidesArr.push({...doc.data(), id: doc.id, items: JSON.parse(doc.data().items)});
                });
                dispatch(setGuides(guidesArr))
                dispatch(setIsGuidesLoading(false))
            } catch (e) {
                dispatch(setIsGuidesLoading(false))
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])
    useEffect(() => {
        const q = query(collection(db, apiRoutes.guidesCategories));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setIsGuidesLoading(true))
                let categoriesArr: IGuideCategory [] = []
                querySnapshot.forEach((doc: any) => {
                    categoriesArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setGuideCategories(categoriesArr))
                dispatch(setIsGuidesLoading(false))
            } catch (e) {
                dispatch(setIsGuidesLoading(false))
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])
    if (isLoading) return (<Preloader/>)
    return (
        <Container sx={{padding: "5px"}}>
            <Header/>
            <Box mt={3}>
                <AppRoutes/>
            </Box>
            <Message/>
        </Container>
    );
}

export default App;
