import React, {FC, useEffect, useId} from 'react';
import {FormControl, FormLabel, Radio} from "@mui/material";
import Grid from "@mui/material/Grid";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import ArticleIcon from "@mui/icons-material/Article";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {changeEditionGuideItemsType} from "../services/reducers/guides";
import {routes} from "../utils/routes";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import {IGuideItem} from "../models/iGuide";

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
    const handleBackClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumbs?.questionId)
        dispatch(removeLastBreadCrumb())
    }
    return (
        <Grid container alignItems="start" justifyContent="space-between">
            {isEdit && guideStep.id !== 0 && (
                <FormControl>
                    <FormLabel id={radioButtonId}>
                        <Grid container alignItems="center" sx={{marginBottom: "10px"}}>
                            {guideStep.type === GUIDE_ITEM_TYPE.result
                                ? (<ArticleIcon/>)
                                : (<HelpCenterIcon/>)}
                            <Typography sx={{marginLeft: "10px"}}>
                                Тип текущего шага
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
                        <FormControlLabel value={GUIDE_ITEM_TYPE.result}
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
                    <Typography variant="h4" fontSize="18px" color="inherit" fontWeight={600}>
                        {guideStep.type === GUIDE_ITEM_TYPE.result
                            ? "Результат"
                            : ` Вопрос № ${breadCrumbsCount + 1}`}
                    </Typography>
                </Stack>
            )}
            {guideStep.id !== 0 && (
                <Button onClick={handleBackClick} disabled={!lastBreadCrumbs}>
                    Назад
                </Button>
            )}
        </Grid>
    );
};

export default GuideStepHeader;