import React, {FC, useState} from 'react';
import {IGuide} from "../models/iGuide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import GuideHeaderInformationBox from "./GuideHeaderInformationBox";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategoryNameById, getIsEdit} from "../services/selectors/guidesSelectors";
import {ButtonGroup, SelectChangeEvent} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {
    changeEditionGuideTitle,
    emptyGuide,
    setEditionGuide,
    setEditionGuideCategory,
    setIsEdit
} from "../services/reducers/guides";
import SelectGuideCategory from "./SelectGuideCategory";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddNewCategory from "./AddNewCategory";
import TextField from "@mui/material/TextField";
import {fetchUpdateGuide} from "../services/actions/guidesActionsCreators";

interface IGuideHeaderProps {
    isEdit: boolean,
    guide: IGuide
}

const GuideHeader: FC<IGuideHeaderProps> = ({isEdit, guide}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countSteps = useAppSelector(state => getCountGuideSteps(state, guide.id))
    const [isOpenNewCategoryWindow, setIsOpenNewCategoryWindow] = useState(false)
    const handleGuideNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditionGuideTitle(e.target.value))
    }
    const toggleIsOpenNewCategoryWindow = () => {
        setIsOpenNewCategoryWindow(prev => !prev)
    }
    const handleBackClick = () => {
        navigate(routes.main)
    }
    const handleCancelClick = () => {
        dispatch(setIsEdit(false))
        dispatch(setEditionGuide(emptyGuide))
    }
    const handleEditClick = () => {
        dispatch(setEditionGuide(guide))
        dispatch(setIsEdit(true))
    }
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setEditionGuideCategory(e.target.value))
    }
    const handleAddCategoryClick = () => {
        toggleIsOpenNewCategoryWindow()
    }
    const handleSaveClick = () => {
        dispatch(fetchUpdateGuide(guide))
        dispatch(setIsEdit(false))
    }
    return (
        <Box>
            <Grid container spacing={2} columns={12} alignItems="center" justifyContent="space-between" mt={3}>
                <Grid xs={8} sm={8} md={8}>
                    {isEdit
                        ? (<TextField value={guide.title}
                                      onChange={handleGuideNameChange}
                                      id="outlined-basic"
                                      label="Заголовок гайда"
                                      variant="outlined"
                                      fullWidth/>)
                        : (<Typography variant="h3" fontSize={37} fontWeight={800} gutterBottom>
                            {guide.title}
                        </Typography>)}
                </Grid>
                <Grid>
                    <ButtonGroup>
                        {isEdit
                            ? (<>
                                <Button onClick={handleCancelClick}>Отмена</Button>
                                <Button onClick={handleSaveClick} variant="contained">Сохранить</Button>
                            </>)
                            : (<>
                                <Button onClick={handleEditClick} variant="contained">Редактировать</Button>
                                <Button onClick={handleBackClick}>На главную</Button>
                            </>)}
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Box sx={{marginTop: 3}}>
                <Grid container spacing={{xs: 4, md: 6}} columns={{xs: 3, sm: 8, md: 12}}>
                    <GuideHeaderInformationBox title={"Автор:"}>
                        <Typography fontWeight={600}>
                            {guide.authorId ? guide.authorId : "Автор неизвестен"}
                        </Typography>
                    </GuideHeaderInformationBox>
                    <GuideHeaderInformationBox title={isEdit ? "" : "Категория:"}>
                        {isEdit
                            ? (
                                <Grid container justifyContent="space-around">
                                    <Grid>
                                        <SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                                             handleGuideCategoryChange={handleGuideCategoryChange}/>
                                    </Grid>
                                    <Grid xs={1}>
                                        <IconButton onClick={handleAddCategoryClick} aria-label="add">
                                            <AddCircleOutlineIcon color="primary" fontSize="large"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                            : (
                                <Typography fontWeight={600}>
                                    {categoryName}
                                </Typography>
                            )}
                    </GuideHeaderInformationBox>
                    <GuideHeaderInformationBox title={"Количество шагов:"}>
                        <Typography fontWeight={600}>
                            {countSteps}
                        </Typography>
                    </GuideHeaderInformationBox>
                </Grid>
            </Box>
            <AddNewCategory isOpenNewCategoryWindow={isOpenNewCategoryWindow}
                            toggleIsOpenNewCategoryWindow={toggleIsOpenNewCategoryWindow}/>
        </Box>
    );
};

export default GuideHeader;