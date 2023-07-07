import React, {FC, useEffect} from 'react';
import {IGuideItemOption} from "../models/iGuide";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";

interface IGuideStepAnswerProps {
    option: IGuideItemOption
    questionText: string
    questionId: number
    index: number
    isEdit: boolean
    handleOptionTextChange: (e: React.ChangeEvent<HTMLInputElement>, optionId: number) => void
    handleNextQuestionClick: (optionId: number, optionText: string, nextId: number) => void
    handleOptionRemove: (guideStepId: number, optionId: number) => void
}

const GuideStepAnswersItem: FC<IGuideStepAnswerProps> = ({
                                                        option,
                                                        questionText,
                                                        questionId,
                                                        index,
                                                        isEdit,
                                                        handleOptionTextChange,
                                                        handleNextQuestionClick,
                                                        handleOptionRemove
                                                    }) => {
    const onRemoveOptionClick = () => {
        handleOptionRemove(questionId, option.id)
    }
    const onOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleOptionTextChange(e, option.id)
    }
    const onNextClick = () => {
        handleNextQuestionClick(option.id, option.text, option.nextId)
    }

    return (
        <Box>
            {isEdit
                ? (<FormControl sx={{m: 1, width: '100%'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">
                            {`Вариант ответа № ${index + 1}`}
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
                                        onMouseDown={() => {
                                        }}
                                    >
                                        <SendIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )
                : (<Button variant="outlined" onClick={onNextClick}>
                    {option.text}
                </Button>)}
        </Box>
    );
};

export default GuideStepAnswersItem;