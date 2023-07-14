import React, {FC, useState} from 'react';
import {IGuide} from "../models/iGuide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import GuideHeaderInformationBox from "./GuideHeaderInformationBox";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getCountGuideSteps, getGuideCategoryNameById, getIsEdit} from "../services/selectors/guidesSelectors";
import {ButtonGroup, SelectChangeEvent, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {
    changeEditionGuideTitle,
    emptyGuide,
    setEditionGuide,
    setEditionGuideCategory,
    setIsEdit,
    setIsNewGuideEdition
} from "../services/reducers/guides";
import SelectGuideCategory from "./SelectGuideCategory";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddNewCategory from "./AddNewCategory";
import TextField from "@mui/material/TextField";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {getUser} from "../services/selectors/authSelector";

interface IGuideHeaderProps {
    isEdit: boolean,
    isNewGuide: boolean
    guide: IGuide
}

const GuideHeader: FC<IGuideHeaderProps> = ({isEdit, guide, isNewGuide}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => getUser(state))
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const countSteps = useAppSelector(state => getCountGuideSteps(state, guide.id, isEdit, isNewGuide))
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
        if (isNewGuide) {
            dispatch(fetchNewGuide(guide))
            dispatch(setIsNewGuideEdition(false))
            navigate(routes.main)
        } else {
            dispatch(fetchUpdateGuide(guide))
        }
        dispatch(setIsEdit(false))
    }
    const addCategoryButton = (
        <Button key={"add_button"} onClick={handleAddCategoryClick} variant="text" startIcon={<AddCircleOutlineIcon/>}>
            Добавить категорию
        </Button>)
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
                <Stack spacing={1}>
                    <Typography fontSize="14px" fontWeight={500} align="center">
                        {isNewGuide && "Новый гайд"}
                        {!isNewGuide && isEdit && "Режим редактирования"}
                        {!isNewGuide && !isEdit && "Режим просмотра"}
                    </Typography>
                    <ButtonGroup>
                        {isEdit
                            ? (<>
                                {!isNewGuide && (
                                    <Button onClick={handleCancelClick} startIcon={<CancelIcon/>}>
                                        Отмена
                                    </Button>
                                )}
                                <Button onClick={handleSaveClick}
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                        disabled={!guide.title || !!guide.authorId && user.id !== guide.authorId}>
                                    Сохранить
                                </Button>
                            </>)
                            : (<>
                                <Button onClick={handleEditClick}
                                        variant="contained"
                                        startIcon={<EditIcon/>}
                                        disabled={!!guide.authorId && user.id !== guide.authorId}>
                                    Редактировать
                                </Button>
                                <Button onClick={handleBackClick} startIcon={<KeyboardReturnIcon/>}>
                                    На главную
                                </Button>
                            </>)}
                    </ButtonGroup>
                    <Typography fontSize="11px" fontWeight={300} align="center">
                        {isEdit && !isNewGuide && "Не забудьте сохранить внесённые изменения."}
                        {!!guide.authorId && user.id !== guide.authorId && "вы можете редактировать только свои гайды или гайды без автора"}
                    </Typography>
                </Stack>
            </Grid>
            <Box sx={{marginTop: 3}}>
                <Grid container spacing={2}>
                    <Grid  xs={12} md={4}>
                        <GuideHeaderInformationBox title={"Автор:"}>
                            <Typography fontWeight={400}>
                                {isNewGuide && "Вы"}
                                {!isNewGuide && guide.authorId && guide.authorId}
                                {!isNewGuide && !guide.authorId && "Автор неизвестен"}
                            </Typography>
                        </GuideHeaderInformationBox>
                    </Grid>
                    <Grid  xs={12} md={4}>
                        <GuideHeaderInformationBox title={isEdit ? "" : "Категория:"}>
                            {isEdit
                                ? (
                                    <Grid container justifyContent="space-around">
                                        <Grid>
                                            <SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                                                 addCategoryButton={addCategoryButton}
                                                                 handleGuideCategoryChange={handleGuideCategoryChange}/>
                                        </Grid>
                                    </Grid>
                                )
                                : (
                                    <Typography fontWeight={400}>
                                        {categoryName}
                                    </Typography>
                                )}
                        </GuideHeaderInformationBox>
                    </Grid>
                    <Grid  xs={12} md={4}>
                        <GuideHeaderInformationBox title={"Количество шагов:"}>
                            <Typography fontWeight={400}>
                                {countSteps}
                            </Typography>
                        </GuideHeaderInformationBox>
                    </Grid>
                </Grid>
            </Box>
            <AddNewCategory isOpenNewCategoryWindow={isOpenNewCategoryWindow}
                            toggleIsOpenNewCategoryWindow={toggleIsOpenNewCategoryWindow}/>
        </Box>
    );
};

export default GuideHeader;