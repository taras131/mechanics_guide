import React, {FC} from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {updateItemType} from "../services/reducers/newGuide";
import {useAppDispatch} from "../hooks/redux";
import {IGuideItem} from "../models/newGuideInterface";

interface INewGuideItemSelectTypeProps {
    currentGuideItem: IGuideItem,
}

const NewGuideItemSelectType:FC<INewGuideItemSelectTypeProps> = ({currentGuideItem}) => {
    const dispatch = useAppDispatch()
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === GUIDE_ITEM_TYPE.question || e.target.value === GUIDE_ITEM_TYPE.result) {
            dispatch(updateItemType({id: currentGuideItem.id, type: e.target.value}))
        }
    }
    return (
        <FormControl sx={{
            width: '100%',
            marginTop: "40px"
        }}>
            <FormLabel id="type-controlled">Тип этапа</FormLabel>
            <RadioGroup
                row
                aria-labelledby="type-controlled"
                name="type"
                value={currentGuideItem.type}
                onChange={handleTypeChange}
            >
                <FormControlLabel value="question" control={<Radio/>} label="Вопрос"/>
                <FormControlLabel value="result" control={<Radio/>} label="Результат"/>
            </RadioGroup>
        </FormControl>
    );
};

export default NewGuideItemSelectType;