import React, {FC, useId} from 'react';
import TextField from "@mui/material/TextField";
import {GUIDE_ITEM_TYPE} from "../utils/const";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import GuideStepAnswers from "./GuideStepAnswers";
import {changeEditionGuideItemsText} from "../services/reducers/guides";
import {useAppDispatch} from "../hooks/redux";
import {IGuideItem} from "../models/iGuide";

interface IProps {
    breadCrumbsCount: number
    guideStep: IGuideItem
    isEdit: boolean
}

const GuideStepMain: FC<IProps> = ({breadCrumbsCount, guideStep, isEdit}) => {
    const dispatch = useAppDispatch()
    const questionInputId = useId()
    const handleGuideStepTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditionGuideItemsText({guideStepId: guideStep.id, newValue: e.target.value}))
    }
    return (
        <>
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
            {guideStep.type === GUIDE_ITEM_TYPE.question && (
                <GuideStepAnswers options={[...guideStep.options]}
                                  questionText={guideStep.text}
                                  questionId={guideStep.id}
                                  isEdit={isEdit}
                                  guideStepId={guideStep.id}/>
            )}
        </>
    );
};

export default GuideStepMain;