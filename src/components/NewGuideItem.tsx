import React, {FC} from 'react';
import {
    Stack,
    TextField
} from "@mui/material";
import {getNewGuideItemById} from "../services/selectors/newGuideSelectors";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {updateText} from "../services/reducers/newGuide";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import NewGuideOptions from "./NewGuideOptions";
import RedirectToGuideItem from "./RedirectToGuideItem";
import NewGuideItemSelectType from "./NewGuideItemSelectType";
import NewGuideItemHeader from "./NewGuideItemHeader";

interface NewGuideItemProps {
    id: number,
}

const NewGuideItem: FC<NewGuideItemProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const currentGuideItem = useAppSelector(state => getNewGuideItemById(state, id))
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateText({id: currentGuideItem.id, text: e.target.value}))
    }
    return (
        <Stack spacing={2}>
            <NewGuideItemHeader/>
            <NewGuideItemSelectType currentGuideItem={currentGuideItem}/>
            <TextField fullWidth
                       id="outlined-multiline-static"
                       label={currentGuideItem.type === GUIDE_ITEM_TYPE.result ? "Введите результат" : "Введите вопрос"}
                       multiline
                       rows={4}
                       value={currentGuideItem.text}
                       onChange={handleTextChange}
                       sx={{marginTop: "20px"}}
            />
            {currentGuideItem.type === GUIDE_ITEM_TYPE.question &&
                (<NewGuideOptions currentGuideItem={currentGuideItem}/>)}
            <RedirectToGuideItem type={currentGuideItem.type}/>
        </Stack>
    );
};

export default NewGuideItem;