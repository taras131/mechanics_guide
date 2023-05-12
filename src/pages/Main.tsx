import React, {useEffect, useState} from 'react';
import {SelectChangeEvent, Stack} from "@mui/material";
import GuidesPreviewList from "../components/GuidesPreviewList";
import {useAppDispatch} from "../hooks/redux";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {IGuide} from "../models/guideInterface";
import {setGuides, setIsGuidesLoading} from "../services/reducers/guides";
import GuidesFilter from "../components/GuidesFilter";
import {ALL_CATEGORIES} from "../utils/const";

const Main = () => {
    const dispatch = useAppDispatch()
    const [currentCategory, setCurrentCategory] = useState(ALL_CATEGORIES)
    const handleCategoryChange = (e: SelectChangeEvent) => {
        setCurrentCategory(e.target.value)
    }
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
        <Stack>
            <GuidesFilter currentCategory={currentCategory} handleCategoryChange={handleCategoryChange}/>
            <GuidesPreviewList currentCategory={currentCategory}/>
        </Stack>
    );
};

export default Main;