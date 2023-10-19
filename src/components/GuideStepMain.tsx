import React, {FC, useId} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GuideStepAnswers from "./GuideStepAnswers";
import {changeEditionGuideItemsText} from "../services/reducers/guides";
import {useAppDispatch} from "../hooks/redux";
import {EMPTY_GUIDE_ITEM_MESSAGE, GUIDE_ITEM_TYPE, OUTLINED} from "../utils/const";
import {IGuideItem} from "../models/iGuide";
import GuideStepMainActions from "./GuideStepMainActions";

interface IProps {
    breadCrumbsCount: number
    guideStep: IGuideItem
    isEdit: boolean
}

const textResultLabel = "Текст результата";
const textQuestionLabel = "Текст вопроса №";
const GuideStepMain: FC<IProps> = ({breadCrumbsCount, guideStep, isEdit}) => {
    const dispatch = useAppDispatch();
    const questionInputId = useId();
    const handleGuideStepTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeEditionGuideItemsText({guideStepId: guideStep.id, newValue: e.target.value}));
    };
    return (
        <>
            {isEdit
                ? (<TextField value={guideStep.text}
                              onChange={handleGuideStepTextChange}
                              id={questionInputId}
                              label={guideStep.type === GUIDE_ITEM_TYPE.result
                                  ? textResultLabel
                                  : `${textQuestionLabel} ${breadCrumbsCount + 1}`}
                              variant={OUTLINED}
                              multiline
                              rows={4}
                              fullWidth/>)
                : (<pre style={{
                    whiteSpace: "pre-wrap",
                }}>
                    <Typography fontWeight={500} fontSize={"18px"}>
                    {guideStep.text ? guideStep.text : EMPTY_GUIDE_ITEM_MESSAGE}
                </Typography>
                        </pre>)}
            {guideStep.type === GUIDE_ITEM_TYPE.question && (
                <GuideStepAnswers options={[...guideStep.options]}
                                  questionText={guideStep.text}
                                  questionId={guideStep.id}
                                  isEdit={isEdit}
                                  guideStepId={guideStep.id}/>
            )}
            {isEdit && (
                <GuideStepMainActions options={guideStep.options} guideStep={guideStep}
                                      guideStepType={guideStep.type}/>
            )}
        </>
    );
};

export default GuideStepMain;