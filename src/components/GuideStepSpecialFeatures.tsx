import React, {FC, useState} from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import {useAppSelector} from "../hooks/redux";
import {getEditionGuideStepsByType} from "../services/selectors/guidesSelectors";
import SelectRedirectGuideStep from "./SelectRedirectGuideStep";

interface IGuideStepSpecialFeaturesProps {
    guideStepType: GUIDE_ITEM_TYPE
    currentGuideStepId: number
}

const GuideStepSpecialFeatures: FC<IGuideStepSpecialFeaturesProps> = ({
                                                                          guideStepType,
                                                                          currentGuideStepId
                                                                      }) => {
    const guideSteps = useAppSelector(state => getEditionGuideStepsByType(state, guideStepType))
        .filter(result => result.id !== currentGuideStepId)
    const [isOpenSelectResultWindow, setIsOpenSelectResultWindow] = useState(false)
    const toggleIsOpenSelectResultWindow = () => {
        setIsOpenSelectResultWindow(prev => !prev)
    }
    return (
        <Stack spacing={3} sx={{marginTop: "50px"}}>
            <Typography variant="h4" fontSize="16px" color="inherit" fontWeight={600}>
                Специальные возможности
            </Typography>
            {guideStepType === GUIDE_ITEM_TYPE.question
                ? (<>
                    <Grid container alignItems="center" justifyContent="start">
                        <Grid item xs={4}>
                            <Button onClick={toggleIsOpenSelectResultWindow} disabled={guideSteps.length === 0}>
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
                            <Button>Перенаправить на другой гайд</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography fontSize="12px" color="inherit" fontWeight={300}>
                                Вы можете перенаправить текущий этап на уже готовый гайд, выбрав нужный из выпадающего
                                списка.
                            </Typography>
                        </Grid>
                    </Grid>
                </>)
                : (<Grid container alignItems="center" justifyContent="start">
                    <Grid item>
                        <Button onClick={toggleIsOpenSelectResultWindow} disabled={guideSteps.length === 0}>
                            Перенаправить на другой результат
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Вы можете перенаправить текущий этап на уже готовый результат, выбрав нужный из выпадающего
                            списка. Если кнопка не активна, значит у вас ещё нет результатов из которых можно выбрать.
                        </Typography>
                    </Grid>
                </Grid>)}
            <SelectRedirectGuideStep isOpenSelectResultWindow={isOpenSelectResultWindow}
                                     toggleIsOpenSelectResultWindow={toggleIsOpenSelectResultWindow}
                                     guideSteps={guideSteps}/>
        </Stack>
    );
};

export default GuideStepSpecialFeatures;