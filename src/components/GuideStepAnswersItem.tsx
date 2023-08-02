import React, {FC} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import Grid from "@mui/material/Unstable_Grid2";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import Typography from "@mui/material/Typography";
import {PRIMARY, START} from "../utils/const";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
}

const GuideStepAnswersItem: FC<IGuideStepAnswerProps> = ({
                                                             option,
                                                             questionText,
                                                             questionId,
                                                             index,
                                                             isEdit,
                                                             handleOptionTextChange,
                                                             handleNextQuestionClick,
                                                             handleOptionRemove,
                                                             handleRedirectGuideClick
                                                         }) => {
    const onRemoveOptionClick = () => {
        handleOptionRemove(questionId, option.id)
    }
    const onOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleOptionTextChange(e.target.value, option.id)
    }
    const onNextClick = () => {
        if (option.redirectAnotherGuide) {
            handleRedirectGuideClick(option.redirectAnotherGuide)
        } else {
            handleNextQuestionClick(option.id, option.text, option.nextId)
        }
    }
    return (
        <Grid key={option.id + "_" + option.nextId} xs={12} sm={6} md={6}>
            {isEdit
                ? (<FormControl sx={{m: 1, width: '100%'}} variant="standard">
                        <InputLabel htmlFor={option.id + ""}>
                            {option.redirectAnotherGuide
                                ? `Перенаправление  на другой гайд`
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
                                        onClick={onRemoveOptionClick}
                                        onMouseDown={() => {
                                        }}
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
                                        {option.redirectAnotherGuide ? (<MergeTypeIcon/>) : (<ArrowForwardIcon/>)}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )
                : (<Button fullWidth
                           sx={{justifyContent: START}}
                           onClick={onNextClick}
                           startIcon={<TripOriginIcon/>}>
                    <Typography>
                        {option.text}
                    </Typography>
                </Button>)}
        </Grid>
    );
};

export default GuideStepAnswersItem;