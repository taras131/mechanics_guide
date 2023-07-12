import React, {FC, useEffect} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useAppDispatch} from "../hooks/redux";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {setIsEdit} from "../services/reducers/guides";

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
        <Box key={option.id}>
            {isEdit
                ? (<FormControl sx={{m: 1, width: '100%'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                            {option.redirectAnotherGuide
                                ? `Перенаправление  на другой гайд`
                                : `Вариант ответа № ${index + 1}`}

                        </InputLabel>
                        <Input
                            key={option.id}
                            value={option.text}
                            onChange={onOptionTextChange}
                            sx={{height: "50px"}}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
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
                                        aria-label="toggle password visibility"
                                        onClick={onNextClick}
                                    >
                                        {option.redirectAnotherGuide ? (<NextPlanIcon/>) : (<SendIcon/>)}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )
                : (<Button variant="outlined"
                           onClick={onNextClick}
                           endIcon={option.redirectAnotherGuide ? (<NextPlanIcon/>) : (<SendIcon/>)}>
                    {option.text}
                </Button>)}
        </Box>
    );
};

export default GuideStepAnswersItem;