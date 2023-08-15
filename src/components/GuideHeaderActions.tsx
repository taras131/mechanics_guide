import React, {FC, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {
    CENTER,
    COLUMN,
    CONTAINED,
    END,
    GUIDE_MODE,
    MESSAGE_SEVERITY,
    RIGHT,
    SECONDARY_TEXT_COLOR
} from "../utils/const";
import {ButtonGroup, SelectChangeEvent} from "@mui/material";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getUser} from "../services/selectors/authSelector";
import {routes} from "../utils/routes";
import HomeIcon from '@mui/icons-material/Home';
import {emptyGuide, setEditionGuide, setEditionGuideCategory, setGuideMode,} from "../services/reducers/guides";
import {fetchNewGuide, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {useLocation, useNavigate} from "react-router-dom";
import {IGuide} from "../models/iGuide";
import SelectGuideCategory from "./SelectGuideCategory";
import {getGuideCategoryNameById} from "../services/selectors/guidesSelectors";
import {cleanBreadCrumbs} from "../services/reducers/breadCrumbs";
import ModalWindowWithQuestion from "./ModalWindowWithQuestion";
import {setMessage} from "../services/reducers/message";

interface IProps {
    guide: IGuide
    guideMode: GUIDE_MODE
    matches_900: boolean
    titleError: string
}

const editingHelperText = "Вы можете редактировать только свои гайды или гайды без автора"
const savingHelperText = "Не забудьте сохранить изменения."

const GuideHeaderActions: FC<IProps> = ({
                                            guide,
                                            guideMode,
                                            matches_900,
                                            titleError
                                        }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location: any = useLocation()
    const user = useAppSelector(state => getUser(state))
    const categoryName = useAppSelector(state => getGuideCategoryNameById(state, guide.categoryId))
    const [isQuestionWindowOpen, setIsQuestionWindowOpen] = useState(false)
    const handleAuthClick = () => {
        navigate(routes.login, {state: {from: location.pathname}})
    }
    const toggleIsQuestionWindowOpen = () => {
        setIsQuestionWindowOpen(prev => !prev)
    }
    const handleBackClick = () => {
        navigate(routes.main)
    }
    const handleResetAgreeClick = (guideMode: GUIDE_MODE) => () => {
        if (guideMode === GUIDE_MODE.new_guide) {
            navigate(routes.guide + "/" + GUIDE_MODE.new_guide + "/0")
            dispatch(cleanBreadCrumbs())
            dispatch(setEditionGuide(emptyGuide))
            localStorage.removeItem("saved_new_guide")
        } else {
            dispatch(setGuideMode(GUIDE_MODE.viewing))
            dispatch(setEditionGuide(emptyGuide))
            localStorage.removeItem(`${GUIDE_MODE.editing}_${guide.id}`)
        }
        toggleIsQuestionWindowOpen()
    }
    const handleCancelClick = () => {
        toggleIsQuestionWindowOpen()
    }
    const handleEditClick = () => {
        dispatch(setEditionGuide(guide))
        dispatch(setGuideMode(GUIDE_MODE.editing))
    }
    const handleSaveClick = () => {
        if (guideMode === GUIDE_MODE.new_guide) {
            dispatch(fetchNewGuide(guide))
            localStorage.removeItem("saved_new_guide")
            navigate(routes.main)
            dispatch(setMessage({severity: MESSAGE_SEVERITY.success, text: "Ваш гайд сохранён"}))
        } else {
            dispatch(fetchUpdateGuide({...guide, authorId: user.id}))
            localStorage.removeItem(`${GUIDE_MODE.editing}_${guide.id}`)
            dispatch(setMessage({severity: MESSAGE_SEVERITY.success, text: "Изменения сохранены"}))
        }
        dispatch(setGuideMode(GUIDE_MODE.viewing))
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
                {guideMode === GUIDE_MODE.viewing
                    ? (<Typography fontSize="16px"
                                   fontWeight={600}
                                   color={SECONDARY_TEXT_COLOR}>
                        {categoryName}
                    </Typography>)
                    : (<SelectGuideCategory selectedGuideCategoryId={guide.categoryId}
                                            handleGuideCategoryChange={handleGuideCategoryChange}/>)}
            </Grid>
            <Grid mt={guideMode !== GUIDE_MODE.viewing && !matches_900 ? 4 : 2}>
                <ButtonGroup>
                    {guideMode === GUIDE_MODE.viewing
                        ? (<>
                            <Button onClick={handleEditClick}
                                    variant={CONTAINED}
                                    startIcon={<EditIcon/>}
                                    disabled={user.id === ""}>
                                Редактировать
                            </Button>
                            <Button onClick={handleBackClick} startIcon={<HomeIcon/>}>
                                Главная
                            </Button>
                        </>)
                        : (<>
                            <Button onClick={handleCancelClick} startIcon={<CancelIcon/>}>
                                {guideMode === GUIDE_MODE.new_guide ? "Сбросить" : "Отмена"}
                            </Button>
                            <Button onClick={handleSaveClick}
                                    variant={CONTAINED}
                                    startIcon={<SaveIcon/>}
                                    disabled={!!titleError || user.id === ""}>
                                Сохранить
                            </Button>
                        </>)}
                </ButtonGroup>
                <Typography fontSize="12px" fontWeight={400} align={RIGHT} mt={2} color={SECONDARY_TEXT_COLOR}>
                    {user.id && guideMode !== GUIDE_MODE.viewing && savingHelperText}
                    {user.id === "" && (
                        <Typography fontSize={"12px"} color={"primary"} sx={{cursor: "pointer"}}
                                    onClick={handleAuthClick}>
                            Авторизуйтесь для внесения изменений
                        </Typography>)}
                </Typography>
            </Grid>

            <ModalWindowWithQuestion isOpenModal={isQuestionWindowOpen}
                                     handleToggleOpen={toggleIsQuestionWindowOpen}
                                     questionText={"Вы уверены, что хотите сбросить изменения?"}
                                     handleYesClick={handleResetAgreeClick(guideMode)}/>
        </Grid>
    );
};

export default GuideHeaderActions;