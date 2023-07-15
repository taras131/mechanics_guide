import React, {FC, useEffect} from 'react';
import {changeEditionGuideOptionText, editionGuideStepRemoveOption, setIsEdit} from "../services/reducers/guides";
import {addBreadCrumb, cleanBreadCrumbs} from "../services/reducers/breadCrumbs";
import {routes} from "../utils/routes";
import {IGuideItemOption} from "../models/iGuide";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import GuideStepAnswersItem from "./GuideStepAnswersItem";

interface IGuideStepAnswersListProps {
    options: IGuideItemOption []
    questionId: number
    questionText: string
    isEdit: boolean
}

const GuideStepAnswersList: FC<IGuideStepAnswersListProps> = ({
                                                                  options,
                                                                  questionId,
                                                                  questionText,
                                                                  isEdit
                                                              }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const guideId = useParams().guideId || "0";
    const handleOptionRemove = (guideStepId: number, optionId: number) => {
        dispatch(editionGuideStepRemoveOption({guideStepId, optionId}))
    }
    const handleOptionTextChange = (newValue: string, optionId: number,) => {
        dispatch(changeEditionGuideOptionText({
            guideStepId: questionId,
            optionId: optionId,
            newValue: newValue
        }))
    }
    const handleNextQuestionClick = (optionId: number, optionText: string, nextId: number) => {
        dispatch(addBreadCrumb({
            questionText: questionText,
            answerText: optionText,
            questionId: questionId,
            optionId: optionId,
            nextId: nextId
        }))
        navigate(routes.guide + "/" + guideId + "/" + nextId)
    }
    const handleRedirectGuideClick = (redirectAnotherGuide: string) => {
        navigate(`${routes.guide}/${redirectAnotherGuide}/0`)
        dispatch(setIsEdit(false))
        dispatch(cleanBreadCrumbs())
    }
    const answersList = options.map((option, index) => {
        return GuideStepAnswersItem({
            option: option,
            questionText: questionText,
            questionId: questionId,
            index: index,
            isEdit: isEdit,
            handleOptionTextChange: handleOptionTextChange,
            handleNextQuestionClick: handleNextQuestionClick,
            handleOptionRemove: handleOptionRemove,
            handleRedirectGuideClick: handleRedirectGuideClick
        })
    })
    return (
        <>
            {answersList}
        </>
    );
};

export default GuideStepAnswersList;