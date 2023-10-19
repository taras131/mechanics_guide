import React, {FC} from "react";
import {IGuideItemOption} from "../models/iGuide";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import Typography from "@mui/material/Typography";
import {LEFT, PRIMARY, ROW, SECONDARY_TEXT_COLOR, START} from "../utils/const";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import RedoIcon from "@mui/icons-material/Redo";
import {IBreadCrumb} from "../models/iBreadCrumbs";


interface IGuideStepAnswerProps {
    option: IGuideItemOption
    questionText: string
    questionId: number
    index: number
    isEdit: boolean
    handleOptionTextChange: (newValue: string, optionId: number) => void
    handleNextQuestionClick: (optionId: number, optionText: string, nextId: number) => void
    handleOptionRemove: (guideStepId: number, optionId: number) => void
    handleRedirectGuideClick: (redirectAnotherGuide: string) => void
    breadCrumbs: IBreadCrumb []
}

const GuideStepAnswersItem: FC<IGuideStepAnswerProps> = ({
                                                             option,
                                                             questionId,
                                                             index,
                                                             isEdit,
                                                             handleOptionTextChange,
                                                             handleNextQuestionClick,
                                                             handleOptionRemove,
                                                             handleRedirectGuideClick,
                                                             breadCrumbs,
                                                         }) => {
    const isRedirectToOtherGuideBranch = option.id > option.nextId;
    const checkAnswerWas = (): boolean => {
        let result = false;
        breadCrumbs.forEach(breadCrumb => {
            if (breadCrumb.questionId === questionId && breadCrumb.optionId === option.id && isRedirectToOtherGuideBranch) {
                result = true;
                return;
            }
        });
        return result;
    };
    const isAnswerWas = checkAnswerWas();
    const onRemoveOptionClick = () => {
        handleOptionRemove(questionId, option.id);
    };
    const onOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleOptionTextChange(e.target.value, option.id);
    };
    const onNextClick = () => {
        if (option.redirectAnotherGuide) {
            handleRedirectGuideClick(option.redirectAnotherGuide);
        } else {
            handleNextQuestionClick(option.id, option.text, option.nextId);
        }
    };
    return (
        <Grid key={option.id + "_" + option.nextId} xs={12} sm={6} md={6}>
            {isEdit
                ? (<FormControl sx={{m: 1, width: "100%"}} variant="standard">
                        <InputLabel htmlFor={option.id + ""}>
                            {option.redirectAnotherGuide
                                ? "Перенаправление  на другой гайд"
                                : `Вариант ответа № ${index + 1}`}

                        </InputLabel>
                        <Input
                            id={option.id + ""}
                            value={option.text}
                            onChange={onOptionTextChange}
                            sx={{height: "50px"}}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="delete"
                                        color={PRIMARY}
                                        onClick={onRemoveOptionClick}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="next"
                                        onClick={onNextClick}
                                        color={PRIMARY}
                                    >
                                        {!option.redirectAnotherGuide && !isRedirectToOtherGuideBranch && (
                                            <ArrowForwardIcon/>)}
                                        {option.redirectAnotherGuide && (<MergeTypeIcon/>)}
                                        {isRedirectToOtherGuideBranch && !option.redirectAnotherGuide && (<RedoIcon/>)}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )
                : (<>
                        <Button fullWidth
                                sx={{justifyContent: START}}
                                onClick={onNextClick}
                                disabled={isAnswerWas}>
                            <Stack spacing={2} direction={ROW} alignItems={START} justifyContent={START}>
                                {!option.redirectAnotherGuide && !isRedirectToOtherGuideBranch && (<TripOriginIcon/>)}
                                {option.redirectAnotherGuide && (<MergeTypeIcon/>)}
                                {isRedirectToOtherGuideBranch && !option.redirectAnotherGuide && (<RedoIcon/>)}
                                <Typography fontWeight={500} textAlign={LEFT}>
                                    {option.text}
                                </Typography>
                            </Stack>
                        </Button>
                        {isAnswerWas && (
                            <Typography fontSize={"12px"} fontWeight={400} color={SECONDARY_TEXT_COLOR}>
                                Вы уже выбирали это перенаправление, попробуйте другие варианты или вернитесь назад.
                            </Typography>
                        )}
                    </>
                )}
        </Grid>
    );
};

export default GuideStepAnswersItem;