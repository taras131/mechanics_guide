import React, {FC, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import GuideInformationItem from "./GuideInformationItem";
import Typography from "@mui/material/Typography";
import SelectGuideCategory from "./SelectGuideCategory";
import {IGuide} from "../models/iGuide";
import {SelectChangeEvent} from "@mui/material";
import {setEditionGuideCategory} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategories, getGuideCategoryNameById} from "../services/selectors/guidesSelectors";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddNewStringValueModal from "./AddNewStringValueModal";
import {fetchNewGuideCategory} from "../services/actions/guidesActionsCreators";
import {
    ADD_CATEGORY_LABEL,
    ADD_CATEGORY_SUBHEADER_TEXT,
    ADD_CATEGORY_TITLE,
    CENTER,
    GUIDE_STEPS_COUNT_TITLE
} from "../utils/const";

interface IGuideHeaderInformationProps {
    isNewGuide: boolean
    isEdit: boolean
    guide: IGuide
}

const GuideInformationList: FC<IGuideHeaderInformationProps> = ({isNewGuide, isEdit, guide}) => {
    const dispatch = useAppDispatch()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countSteps = useAppSelector(state => getCountGuideSteps(state, guide.id, isEdit, isNewGuide))
    const categories = useAppSelector(state => getGuideCategories(state))
    const [isOpenNewCategoryWindow, setIsOpenNewCategoryWindow] = useState(false)
    const categoriesNames = categories.map(category => category.categoryName)
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setEditionGuideCategory(e.target.value))
    }
    const toggleIsOpenNewCategoryWindow = () => {
        setIsOpenNewCategoryWindow(prev => !prev)
    }
    const handleAddCategoryWindowClick = () => {
        toggleIsOpenNewCategoryWindow()
    }
    const handleAddCategoryClick = (newCategoryName: string) => {
        dispatch(fetchNewGuideCategory(newCategoryName))
    }
    return (
        <Grid container spacing={2}>
            <GuideInformationItem title={"Автор:"}>
                <Typography fontWeight={400}>
                    {isNewGuide && "Вы"}
                    {!isNewGuide && guide.authorId && guide.authorId}
                    {!isNewGuide && !guide.authorId && "Автор неизвестен"}
                </Typography>
            </GuideInformationItem>
            <GuideInformationItem title={isEdit ? "" : "Категория:"}>
                {isEdit
                    ? (<Grid container alignItems={CENTER} justifyContent={"space-around"} spacing={1}>
                        <Grid>
                            <SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                                 handleGuideCategoryChange={handleGuideCategoryChange}/>
                        </Grid>
                        <Grid>
                            <IconButton onClick={handleAddCategoryWindowClick} color="primary" size={"large"}>
                                <AddBoxIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                    </Grid>)
                    : (<Typography fontWeight={400}>
                        {categoryName}
                    </Typography>)}
            </GuideInformationItem>
            <GuideInformationItem title={GUIDE_STEPS_COUNT_TITLE}>
                <Typography fontWeight={400}>
                    {countSteps}
                </Typography>
            </GuideInformationItem>
            <AddNewStringValueModal
                existingValues={categoriesNames}
                fieldLabelText={ADD_CATEGORY_LABEL}
                isOpenWindow={isOpenNewCategoryWindow}
                listSubHeaderText={ADD_CATEGORY_SUBHEADER_TEXT}
                onAddNewValueClick={handleAddCategoryClick}
                title={ADD_CATEGORY_TITLE}
                toggleIsOpenWindow={toggleIsOpenNewCategoryWindow}/>
        </Grid>
    );
};

export default GuideInformationList;