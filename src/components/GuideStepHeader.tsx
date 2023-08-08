import React, {FC, useEffect, useId} from 'react';
import {ButtonGroup, Divider, FormControl, FormLabel, Radio} from "@mui/material";
import Grid from "@mui/material/Grid";
import {CENTER, GUIDE_ITEM_TYPE, SPACE_BETWEEN, START} from "../utils/const";
import ArticleIcon from "@mui/icons-material/Article";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {changeEditionGuideItemsType} from "../services/reducers/guides";
import {routes} from "../utils/routes";
import {cleanBreadCrumbs, removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {IGuideItem} from "../models/iGuide";
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface IProps {
    breadCrumbsCount: number
    guideId: string
    guideStep: IGuideItem
    isEdit: boolean
}

const GuideStepHeader: FC<IProps> = ({
                                         breadCrumbsCount,
                                         guideId,
                                         guideStep,
                                         isEdit
                                     }) => {
    const dispatch = useAppDispatch()
    const radioButtonId = useId()
    const navigate = useNavigate()
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state))
    useEffect(() => {
        window.onpopstate = e => {
            dispatch(removeLastBreadCrumb())
        }
        return
    }, [])
    const handleGuideStepTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value
        if (newType === GUIDE_ITEM_TYPE.result || newType === GUIDE_ITEM_TYPE.question) {
            dispatch(changeEditionGuideItemsType({guideStepId: guideStep.id, newValue: newType}))
        }
    }
    const handleGoToStartClick = () => {
        navigate(routes.guide + "/" + guideId + "/0")
        dispatch(cleanBreadCrumbs())
    }
    const handleBackClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumbs?.questionId)
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Box>
            <Grid container alignItems={isEdit ? START : CENTER} justifyContent={SPACE_BETWEEN}>
                {isEdit && (
                    <FormControl>
                        <FormLabel id={radioButtonId}>
                            <Grid container alignItems="center" sx={{marginBottom: "10px"}}>
                                {guideStep.type === GUIDE_ITEM_TYPE.result
                                    ? (<ArticleIcon/>)
                                    : (<HelpCenterIcon/>)}
                                <Typography sx={{marginLeft: "10px"}}>
                                    Шаг № {breadCrumbsCount + 1}
                                </Typography>
                            </Grid>
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby={radioButtonId}
                            name={radioButtonId}
                            value={guideStep.type}
                            onChange={handleGuideStepTypeChange}

                        >
                            <FormControlLabel value={GUIDE_ITEM_TYPE.question}
                                              control={<Radio/>}
                                              label="Вопрос"/>
                            <FormControlLabel disabled={guideStep.id === 0}
                                              value={GUIDE_ITEM_TYPE.result}
                                              control={<Radio/>}
                                              label="Результат"/>
                        </RadioGroup>
                    </FormControl>
                )}
                {!isEdit && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        {guideStep.type === GUIDE_ITEM_TYPE.result
                            ? (<ArticleIcon color="primary"/>)
                            : (<HelpCenterIcon color="primary"/>)}
                        <Typography variant="h4" fontSize="14px" color="inherit" fontWeight={300}>
                            {guideStep.type === GUIDE_ITEM_TYPE.result
                                ? "Результат"
                                : ` Вопрос № ${breadCrumbsCount + 1}`}
                        </Typography>
                    </Stack>
                )}
                <ButtonGroup>
                    <Button onClick={handleGoToStartClick} disabled={!lastBreadCrumbs}
                            startIcon={<KeyboardDoubleArrowLeftIcon/>}>
                        Заново
                    </Button>
                    <Button onClick={handleBackClick} disabled={!lastBreadCrumbs} startIcon={<KeyboardArrowLeftIcon/>}>
                        Назад
                    </Button>
                </ButtonGroup>
            </Grid>
            {!isEdit && (<Divider sx={{marginTop: 2}}/>)}
        </Box>

    );
};

export default GuideStepHeader;