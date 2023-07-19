import React, {FC, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import GuideHeaderInformationBox from "./GuideHeaderInformationBox";
import Typography from "@mui/material/Typography";
import SelectGuideCategory from "./SelectGuideCategory";
import AddNewCategory from "./AddNewCategory";
import {IGuide} from "../models/iGuide";
import {SelectChangeEvent} from "@mui/material";
import {setEditionGuideCategory} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategoryNameById} from "../services/selectors/guidesSelectors";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

interface IGuideHeaderInformationProps {
    isNewGuide: boolean
    isEdit: boolean
    guide: IGuide
}

const GuideHeaderInformation: FC<IGuideHeaderInformationProps> = ({isNewGuide, isEdit, guide}) => {
    const dispatch = useAppDispatch()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countSteps = useAppSelector(state => getCountGuideSteps(state, guide.id, isEdit, isNewGuide))
    const [isOpenNewCategoryWindow, setIsOpenNewCategoryWindow] = useState(false)
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setEditionGuideCategory(e.target.value))
    }
    const toggleIsOpenNewCategoryWindow = () => {
        setIsOpenNewCategoryWindow(prev => !prev)
    }
    const handleAddCategoryClick = () => {
        toggleIsOpenNewCategoryWindow()
    }
    return (
        <Grid container spacing={2} sx={{marginTop: 1}}>
            <GuideHeaderInformationBox title={"Автор:"}>
                <Typography fontWeight={400}>
                    {isNewGuide && "Вы"}
                    {!isNewGuide && guide.authorId && guide.authorId}
                    {!isNewGuide && !guide.authorId && "Автор неизвестен"}
                </Typography>
            </GuideHeaderInformationBox>
            <GuideHeaderInformationBox title={isEdit ? "" : "Категория:"}>
                {isEdit
                    ? (<Grid container alignItems={"center"} justifyContent={"space-around"} spacing={1}>
                        <Grid>
                            <SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                                 handleGuideCategoryChange={handleGuideCategoryChange}/>
                        </Grid>
                        <Grid>
                            <IconButton onClick={handleAddCategoryClick} color="primary" size={"large"}>
                                <AddBoxIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                    </Grid>)
                    : (<Typography fontWeight={400}>
                        {categoryName}
                    </Typography>)}
            </GuideHeaderInformationBox>
            <GuideHeaderInformationBox title={"Количество шагов:"}>
                <Typography fontWeight={400}>
                    {countSteps}
                </Typography>
            </GuideHeaderInformationBox>
            <AddNewCategory isOpenNewCategoryWindow={isOpenNewCategoryWindow}
                            toggleIsOpenNewCategoryWindow={toggleIsOpenNewCategoryWindow}/>
        </Grid>
    );
};

export default GuideHeaderInformation;