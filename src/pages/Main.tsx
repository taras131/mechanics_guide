import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import GuidesList from "../components/GuidesList";
import {useAppDispatch} from "../hooks/redux";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {IGuide} from "../models/guideInterface";
import {setGuides, setIsGuidesLoading} from "../services/reducers/guides";

const Main = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const q = query(collection(db, "guides"));
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
    return (
        <Grid container spacing={2}>
            <GuidesList/>
        </Grid>
    );
};

export default Main;