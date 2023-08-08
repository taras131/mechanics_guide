import React, {FC, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {
    CENTER,
    COLUMN,
    CONTAINED,
    EDITION_GUIDE_ID,
    END,
    RIGHT,
    SECONDARY_TEXT_COLOR,
    SPACE_BETWEEN,
    START
} from "../utils/const";
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
import HomeIcon from '@mui/icons-material/Home';
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
import useMediaQuery from "@mui/material/useMediaQuery";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs";
import ModalWindowWithQuestion from "./ModalWindowWithQuestion";

interface IProps {
    guide: IGuide
    isEdit: boolean
    isNewGuide: boolean
    matches_900: boolean
    titleError: string
}

const editingHelperText = "Вы можете редактировать только свои гайды или гайды без автора"
const savingHelperText = "Не забудьте сохранить внесённые изменения."

const GuideHeaderActions: FC<IProps> = ({
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
    const [isQuestionWindowOpen, setIsQuestionWindowOpen] = useState(false)
    const toggleIsQuestionWindowOpen = () => {
        setIsQuestionWindowOpen(prev => !prev)
    }
    const handleBackClick = () => {
        navigate(routes.main)
    }
    const handleResetAgreeClick = () => {
        navigate(routes.guide + "/" + EDITION_GUIDE_ID + "/0")
        dispatch(cleanBreadCrumbs())
        dispatch(setEditionGuide(emptyGuide))
        toggleIsQuestionWindowOpen()
        localStorage.removeItem("new_guide")
    }
    const handleCancelClick = () => {
        if (isNewGuide) {
            toggleIsQuestionWindowOpen()
        } else {
            dispatch(setIsEdit(false))
            dispatch(setEditionGuide(emptyGuide))
        }

    }
    const handleEditClick = () => {
        dispatch(setEditionGuide(guide))
        dispatch(setIsEdit(true))
    }
    const handleSaveClick = () => {
        if (isNewGuide) {
            dispatch(fetchNewGuide(guide))
            dispatch(setIsNewGuideEdition(false))
            localStorage.removeItem("new_guide")
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
              justifyContent={CENTER}
              alignItems={matches_900 ? END : CENTER}
              direction={COLUMN}
        >
            <Grid>
                {isEdit || isNewGuide
                    ? (<SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                            handleGuideCategoryChange={handleGuideCategoryChange}/>)
                    : (<Typography fontSize="16px"
                                   fontWeight={600}
                                   color={SECONDARY_TEXT_COLOR}>
                        {categoryName}
                    </Typography>)}
            </Grid>
            <Grid mt={isEdit && !matches_900 ? 4 : 2}>
                <ButtonGroup>
                    {isEdit
                        ? (<>
                            <Button onClick={handleCancelClick} startIcon={<CancelIcon/>}>
                                {isNewGuide ? "Сбросить" : "Отмена"}
                            </Button>
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
                            <Button onClick={handleBackClick} startIcon={<HomeIcon/>}>
                                Главная
                            </Button>
                        </>)}
                </ButtonGroup>
                <Typography fontSize="11px" fontWeight={300} align={CENTER} mt={1}>
                    {isEdit && !isNewGuide && savingHelperText}
                    {!!guide.authorId && user.id !== guide.authorId && editingHelperText}
                </Typography>
            </Grid>

            <ModalWindowWithQuestion isOpenModal={isQuestionWindowOpen}
                                     handleToggleOpen={toggleIsQuestionWindowOpen}
                                     questionText={"Вы уверены, что хотите сбросить изменения?"}
                                     handleYesClick={handleResetAgreeClick}/>
        </Grid>
    );
};

export default GuideHeaderActions;