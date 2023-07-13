import React, {FC, useState} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    getEditionGuideStepsByType,
    getGuideById,
    getGuidesWithFilter,
    gitIsMyEditionGuide
} from "../services/selectors/guidesSelectors";
import SelectRedirectGuideStep from "./SelectRedirectGuideStep";
import {Paper} from "@mui/material";
import {fetchRemoveGuide} from "../services/actions/guidesActionsCreators";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import SelectRedirectAnotherGuide from "./SelectRedirectAnotherGuide";

interface IGuideStepSpecialFeaturesProps {
    guideStepType: GUIDE_ITEM_TYPE
    currentGuideStepId: number
    guideId: string
}

const GuideStepSpecialFeatures: FC<IGuideStepSpecialFeaturesProps> = ({
                                                                          guideStepType,
                                                                          currentGuideStepId,
                                                                          guideId
                                                                      }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const guideSteps = useAppSelector(state => getEditionGuideStepsByType(state, guideStepType))
        .filter(result => result.id !== currentGuideStepId)
    const currentGuide = useAppSelector(state => getGuideById(state, guideId, true, false))
    const anotherGuides = useAppSelector(state => getGuidesWithFilter(state, currentGuide.categoryId, false))
        .filter(guide => guide.id !== guideId)
    const [isOpenSelectRedirectWindow, setIsOpenSelectRedirectWindow] = useState(false)
    const [isOpenSelectRedirectAnotherGuideWindow, setIsOpenSelectRedirectAnotherGuideWindow] = useState(false)
    const isMyGuide = useAppSelector(state => gitIsMyEditionGuide(state))
    const toggleIsOpenSelectRedirectWindow = () => {
        setIsOpenSelectRedirectWindow(prev => !prev)
    }
    const toggleIsOpenSelectRedirectAnotherGuideWindow = () => {
        setIsOpenSelectRedirectAnotherGuideWindow(prev => !prev)
    }
    const handleRemoveGuideClick = () => {
        navigate(routes.main)
        dispatch(fetchRemoveGuide(guideId))
    }
    return (
        <Paper sx={{padding: 2}}>
            <Stack spacing={2}>
                <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={600}>
                    Специальные возможности
                </Typography>
                {guideStepType === GUIDE_ITEM_TYPE.question && currentGuideStepId !== 0 && (
                    <>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Button onClick={toggleIsOpenSelectRedirectWindow} disabled={guideSteps.length === 0}>
                                    Перенаправить на другой вопрос
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                    Вы можете перенаправить текущий этап на другой вопрос, выбрав нужный из
                                    выпадающего
                                    списка. Если кнопка не активна, значит у вас ещё нет вопросов из которых можно
                                    выбрать.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justifyContent="start">
                            <Grid item xs={4}>
                                <Button onClick={toggleIsOpenSelectRedirectAnotherGuideWindow}>
                                    Перенаправить на другой гайд
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                    Вы можете перенаправить текущий этап на уже готовый гайд, выбрав нужный из
                                    выпадающего
                                    списка.
                                </Typography>
                            </Grid>
                        </Grid>
                    </>)}
                {guideStepType === GUIDE_ITEM_TYPE.result && currentGuideStepId !== 0 && (
                    <Grid container alignItems="center" justifyContent="start">
                        <Grid item xs={4}>
                            <Button onClick={toggleIsOpenSelectRedirectWindow} disabled={guideSteps.length === 0}>
                                Перенаправить на другой результат
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                Вы можете перенаправить текущий этап на уже готовый результат, выбрав нужный из
                                выпадающего
                                списка. Если кнопка не активна, значит у вас ещё нет результатов из которых можно
                                выбрать.
                            </Typography>
                        </Grid>
                    </Grid>)}
                <Grid container alignItems="center" justifyContent="start">
                    <Grid item xs={4}>
                        <Button onClick={handleRemoveGuideClick} disabled={!isMyGuide}>
                            Удалить гайд
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Вы можете удалить гайд , только в том случае, если вы являетесь его автором. Или у гайда нет
                            установленного автора
                        </Typography>
                    </Grid>
                </Grid>
                <SelectRedirectGuideStep isOpenSelectRedirectWindow={isOpenSelectRedirectWindow}
                                         toggleIsOpenSelectRedirectWindow={toggleIsOpenSelectRedirectWindow}
                                         guideSteps={guideSteps}/>
                <SelectRedirectAnotherGuide isOpen={isOpenSelectRedirectAnotherGuideWindow}
                                            toggleIsOpen={toggleIsOpenSelectRedirectAnotherGuideWindow}
                                            anotherGuides={anotherGuides}/>
            </Stack>
        </Paper>
    );
};

export default GuideStepSpecialFeatures;