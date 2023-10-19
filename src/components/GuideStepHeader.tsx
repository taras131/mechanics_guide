import React, {FC, useEffect, useId} from "react";
import {ButtonGroup, Divider, FormControl, FormLabel, Radio} from "@mui/material";
import Grid from "@mui/material/Grid";
import {CENTER, COLUMN, GUIDE_ITEM_TYPE, LEFT, ROW, SECONDARY_TEXT_COLOR, SPACE_BETWEEN, START} from "../utils/const";
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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import useMediaQuery from "@mui/material/useMediaQuery";

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
                                         isEdit,
                                     }) => {
    const dispatch = useAppDispatch();
    const matches_650 = useMediaQuery("(min-width:650px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    const radioButtonId = useId();
    const navigate = useNavigate();
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state));
    useEffect(() => {
        window.onpopstate = () => {
            dispatch(removeLastBreadCrumb());
        };
        return;
    }, []);
    const handleGuideStepTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value;
        if (newType === GUIDE_ITEM_TYPE.result || newType === GUIDE_ITEM_TYPE.question) {
            dispatch(changeEditionGuideItemsType({guideStepId: guideStep.id, newValue: newType}));
        }
    };
    const handleGoToStartClick = () => {
        navigate(routes.guide + "/" + guideId + "/0");
        dispatch(cleanBreadCrumbs());
    };
    const handleBackClick = () => {
        navigate(routes.guide + "/" + guideId + "/" + lastBreadCrumbs?.questionId);
        dispatch(removeLastBreadCrumb());
    };
    return (
        <Box>
            <Grid container alignItems={isEdit ? START : CENTER}
                  justifyContent={isEdit && !matches_500 ? CENTER : SPACE_BETWEEN}>
                {isEdit && (
                    <FormControl>
                        <Stack direction={matches_650 ? ROW : COLUMN}
                               spacing={matches_650 ? 3 : 1}
                               alignItems={matches_650 ? CENTER : LEFT}>
                            <FormLabel id={radioButtonId}>
                                <Stack direction={ROW} alignItems={CENTER}>
                                    {guideStep.type === GUIDE_ITEM_TYPE.result
                                        ? (<ArticleIcon/>)
                                        : (<HelpCenterIcon/>)}
                                    <Typography sx={{marginLeft: "10px"}} color={SECONDARY_TEXT_COLOR} fontWeight={500}>
                                        Шаг № {breadCrumbsCount + 1}
                                    </Typography>
                                </Stack>
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
                        </Stack>
                    </FormControl>
                )}
                {!isEdit && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        {guideStep.type === GUIDE_ITEM_TYPE.result
                            ? (<ArticleIcon color="primary"/>)
                            : (<HelpCenterIcon color="primary"/>)}
                        <Typography variant="h4" fontSize="16px" color={SECONDARY_TEXT_COLOR} fontWeight={500}>
                            {guideStep.type === GUIDE_ITEM_TYPE.result
                                ? "Результат"
                                : ` Вопрос № ${breadCrumbsCount + 1}`}
                        </Typography>
                    </Stack>
                )}
                <ButtonGroup>
                    <Button onClick={handleGoToStartClick}
                            disabled={!lastBreadCrumbs}
                            startIcon={<KeyboardDoubleArrowLeftIcon/>}
                            variant="text">
                        Заново
                    </Button>
                    <Button onClick={handleBackClick}
                            disabled={!lastBreadCrumbs}
                            startIcon={<KeyboardArrowLeftIcon/>}
                            variant="text">
                        Назад
                    </Button>
                </ButtonGroup>
            </Grid>
            {!isEdit && (<Divider sx={{marginTop: 2}}/>)}
        </Box>
    );
};

export default GuideStepHeader;