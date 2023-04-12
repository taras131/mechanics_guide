import React, {FC} from 'react';
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getNewGuideItemById} from "../services/selectors/newGuideSelectors";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Box from "@mui/material/Box";
import {updateItemType, updateText} from "../services/reducers/newGuide";

interface NewGuideItemProps {
    id: number
}

const NewGuideItem: FC<NewGuideItemProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const currentItem = useAppSelector(state => getNewGuideItemById(state, id))
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateText({id: currentItem.id, text: e.target.value}))
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "question" || e.target.value === "result") {
            dispatch(updateItemType({id: currentItem.id, type: e.target.value}))
        }
    }
    return (
        <Box mt={"80px"}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    id="outlined-multiline-static"
                    label={currentItem.type === "result" ? "Введите результат" : "Введите вопрос"}
                    multiline
                    rows={4}
                    value={currentItem.text}
                    onChange={handleTextChange}
                />
                <Box mt={"40px"}>
                    <FormControl>
                        <FormLabel id="type-controlled">Тип</FormLabel>
                        <RadioGroup
                            aria-labelledby="type-controlled"
                            name="type"
                            value={currentItem.type}
                            onChange={handleTypeChange}
                        >
                            <FormControlLabel value="question" control={<Radio/>} label="Вопрос"/>
                            <FormControlLabel value="result" control={<Radio/>} label="Результат"/>
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Button>Добавить вариант</Button>
            </Grid>
        </Box>
    );
};

export default NewGuideItem;