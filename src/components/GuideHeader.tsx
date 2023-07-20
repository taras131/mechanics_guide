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
    setIsEdit,
    setIsNewGuideEdition
} from "../services/reducers/guides";
import TextField from "@mui/material/TextField";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {getUser} from "../services/selectors/authSelector";
import GuideHeaderInformation from "./GuideHeaderInformation";

interface IGuideHeaderProps {
    isEdit: boolean,
    isNewGuide: boolean
    guide: IGuide
}

const GuideHeader: FC<IGuideHeaderProps> = ({isEdit, guide, isNewGuide}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => getUser(state))

    const handleGuideNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditionGuideTitle(e.target.value))
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

    return (
        <Box>
            <Grid container spacing={1} alignItems="center" justifyContent="space-between" mt={3}>
                <Grid xs={12} sm={12} md={8}>
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
                <Grid xs={12} sm={12} md={4}>
                    <Grid container alignItems="center"
                          justifyContent="center"
                          direction="column"
                          spacing={1}
                          sx={{height: "100px"}}>
                        <Grid>
                            <Typography fontSize="14px" fontWeight={500} align="center">
                                {isNewGuide && "Новый гайд"}
                                {!isNewGuide && isEdit && "Режим редактирования"}
                                {!isNewGuide && !isEdit && "Режим просмотра"}
                            </Typography>
                        </Grid>
                        <Grid>
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
                                            Главная
                                        </Button>
                                    </>)}
                            </ButtonGroup>
                        </Grid>
                        <Grid>
                            <Typography fontSize="11px" fontWeight={300} align="center">
                                {isEdit && !isNewGuide && "Не забудьте сохранить внесённые изменения."}
                                {!!guide.authorId && user.id !== guide.authorId && "вы можете редактировать только свои гайды или гайды без автора"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <GuideHeaderInformation isNewGuide={isNewGuide} isEdit={isEdit} guide={guide}/>
        </Box>
    );
};

export default GuideHeader;