import React, {FC} from 'react';
import {FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {getNewGuideItemById} from "../services/selectors/newGuideSelectors";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {updateItemType, updateText} from "../services/reducers/newGuide";
import Typography from "@mui/material/Typography";
import NewGuideAddOptionModal from "./NewGuideAddOptionModal";
import NewGuideOptionsList from "./NewGuideOptionsList";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {getBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs"
import SelectResultModal from "./SelectResultModal";
import NewGuideOptions from "./NewGuideOptions";

interface NewGuideItemProps {
    id: number,
}

const NewGuideItem: FC<NewGuideItemProps> = ({id}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const bredCrumbs = useAppSelector(state => getBreadCrumbs(state))
    const currentItem = useAppSelector(state => getNewGuideItemById(state, id))
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateText({id: currentItem.id, text: e.target.value}))
    }
    let prevItemId = 0
    if (bredCrumbs.length) prevItemId = bredCrumbs[bredCrumbs.length - 1].itemId
    const handleBackClick = () => {
        navigate(routes.new_guide + "/" + prevItemId)
        dispatch(removeLastBreadCrumb())
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === GUIDE_ITEM_TYPE.question || e.target.value === GUIDE_ITEM_TYPE.result) {
            dispatch(updateItemType({id: currentItem.id, type: e.target.value}))
        }
    }
    return (
        <Stack spacing={2}>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    width: '100%',
                    marginTop: "40px"
                }}
            >
                <Grid item>
                    <Typography variant="h5" component="h2"> Этап № {currentItem.id + 1}</Typography>
                </Grid>
                <Grid item>
                    {bredCrumbs && bredCrumbs.length > 0 && (
                        <Button variant="outlined" onClick={handleBackClick}>Назад</Button>
                    )}
                </Grid>
            </Grid>
            <FormControl sx={{
                width: '100%',
                marginTop: "40px"
            }}>
                <FormLabel id="type-controlled">Тип этапа</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="type-controlled"
                    name="type"
                    value={currentItem.type}
                    onChange={handleTypeChange}
                >
                    <FormControlLabel value="question" control={<Radio/>} label="Вопрос"/>
                    <FormControlLabel value="result" control={<Radio/>} label="Результат"/>
                </RadioGroup>
            </FormControl>
            <TextField fullWidth
                       id="outlined-multiline-static"
                       label={currentItem.type === "result" ? "Введите результат" : "Введите вопрос"}
                       multiline
                       rows={4}
                       value={currentItem.text}
                       onChange={handleTextChange}
                       sx={{marginTop: "20px"}}
            />
            {currentItem.type === "question" && (
                <NewGuideOptions currentGuideItem ={currentItem}/>
            )}
            {currentItem.type === GUIDE_ITEM_TYPE.result && (
                <SelectResultModal/>
            )}
        </Stack>
    );
};

export default NewGuideItem;