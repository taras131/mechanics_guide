import React, {FC, useEffect, useId} from 'react';
import {IGuideItem} from "../models/iGuide";
import {Divider, FormControl, FormLabel, Paper, Radio} from "@mui/material";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GuideStepAnswers from "./GuideStepAnswers";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import RadioGroup from '@mui/material/RadioGroup';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {removeLastBreadCrumb} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import {getBreadCrumbsCount, getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import TextField from "@mui/material/TextField";
import {changeEditionGuideItemsText, changeEditionGuideItemsType} from "../services/reducers/guides";
import FormControlLabel from "@mui/material/FormControlLabel";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ArticleIcon from '@mui/icons-material/Article';
import GuideStepUploadFile from "./GuideStepUploadFile";

interface IGuideStepProps {
    guideStep: IGuideItem,
    isEdit: boolean
}

const GuideStep: FC<IGuideStepProps> = ({guideStep, isEdit}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state))
    const breadCrumbsCount = useAppSelector(state => getBreadCrumbsCount(state))
    const guideId = useParams().guideId || "0";
    const radioButtonId = useId()
    const questionInputId = useId()
    useEffect(() => {
        window.onpopstate = e => {
            dispatch(removeLastBreadCrumb())
        }
        return
    }, [])
    const handleBackClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumbs?.questionId)
        dispatch(removeLastBreadCrumb())
    }
    const handleGuideStepTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditionGuideItemsText({guideStepId: guideStep.id, newValue: e.target.value}))
    }
    const handleGuideStepTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value
        if (newType === GUIDE_ITEM_TYPE.result || newType === GUIDE_ITEM_TYPE.question) {
            dispatch(changeEditionGuideItemsType({guideStepId: guideStep.id, newValue: newType}))
        }
    }

    return (
        <Paper sx={{padding: "30px 16px"}}>
            <Stack spacing={3}>
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
                {isEdit
                    ? (<TextField value={guideStep.text}
                                  onChange={handleGuideStepTextChange}
                                  id={questionInputId}
                                  label={guideStep.type === GUIDE_ITEM_TYPE.result
                                      ? "Текст результата"
                                      : `Текст вопроса № ${breadCrumbsCount + 1}`}
                                  variant="outlined"
                                  multiline={guideStep.type === GUIDE_ITEM_TYPE.result}
                                  rows={4}
                                  fullWidth/>)
                    : (<Typography fontWeight={400}>
                        {guideStep.text ? guideStep.text : "Эта часть гайда пока не наполнена, перейдите в режим редактирования для заполнения"}
                    </Typography>)}
                {!isEdit && guideStep.type === GUIDE_ITEM_TYPE.question && (<Divider/>)}
                {guideStep.type === GUIDE_ITEM_TYPE.result && (<GuideStepUploadFile guideStep={guideStep}
                                                                                    isEdit={isEdit}
                                                                                    guideId={guideId}/>)}
                {guideStep.type === GUIDE_ITEM_TYPE.question && (
                    <GuideStepAnswers options={[...guideStep.options]}
                                      questionText={guideStep.text}
                                      questionId={guideStep.id}
                                      isEdit={isEdit}
                                      guideStepId={guideStep.id}/>
                )}
            </Stack>
        </Paper>
    );
};

export default GuideStep;