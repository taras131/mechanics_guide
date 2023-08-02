import React, {FC} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {CENTER, COLUMN, CONTAINED, END, SPACE_BETWEEN, START} from "../utils/const";
import {ButtonGroup, SelectChangeEvent} from "@mui/material";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../services/selectors/authSelector";
import {routes} from "../utils/routes";
import {
    emptyGuide,
    setEditionGuide,
    setEditionGuideCategory,
    setIsEdit,
    setIsNewGuideEdition
} from "../services/reducers/guides";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {useNavigate} from "react-router-dom";
import {IGuide} from "../models/iGuide";
import SelectGuideCategory from "./SelectGuideCategory";
import {getGuideCategoryNameById} from "../services/selectors/guidesSelectors";

interface IProps {
    guide: IGuide
    isEdit: boolean
    isNewGuide: boolean
    matches_900: boolean
    titleError: string
}

const editingHelperText = "Вы можете редактировать только свои гайды или гайды без автора"
const savingHelperText = "Не забудьте сохранить внесённые изменения."

const GuideHeaderButtons: FC<IProps> = ({
                                            guide,
                                            isEdit,
                                            isNewGuide,
                                            matches_900,
                                            titleError
                                        }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => getUser(state))
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
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
        } else {
            dispatch(fetchUpdateGuide(guide))
        }
        dispatch(setIsEdit(false))
        navigate(routes.main)
    }
    const handleGuideCategoryChange = (e: SelectChangeEvent) => {
        dispatch(setEditionGuideCategory(e.target.value))
    }
    return (
        <Grid container
              alignItems={matches_900 ? END : CENTER}
              justifyContent={START}
              direction={COLUMN}
              spacing={1}
        >
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
                                    variant={CONTAINED}
                                    startIcon={<SaveIcon/>}
                                    disabled={!!titleError || !!guide.authorId && user.id !== guide.authorId}>
                                Сохранить
                            </Button>
                        </>)
                        : (<>
                            <Button onClick={handleEditClick}
                                    variant={CONTAINED}
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
                <Typography fontSize="11px" fontWeight={300} align={CENTER}>
                    {isEdit && !isNewGuide && savingHelperText}
                    {!!guide.authorId && user.id !== guide.authorId && editingHelperText}
                </Typography>
            </Grid>
            <Grid sx={{marginTop: 3}}>
                {isEdit || isNewGuide
                    ? (<SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                            handleGuideCategoryChange={handleGuideCategoryChange}/>)
                    : (<Typography fontSize="16px" fontWeight={600} align={CENTER} sx={{marginTop: "-25px"}}>
                        {categoryName}
                    </Typography>)}
            </Grid>
        </Grid>
    );
};

export default GuideHeaderButtons;