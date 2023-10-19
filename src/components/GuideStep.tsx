import React, {FC} from "react";
import {IGuideItem} from "../models/iGuide";
import {Paper} from "@mui/material";
import Stack from "@mui/material/Stack";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {getBreadCrumbsCount} from "../services/selectors/breadCrumbsSelectors";
import GuideStepUploadFile from "./GuideStepUploadFile";
import GuideStepHeader from "./GuideStepHeader";
import GuideStepMain from "./GuideStepMain";

interface IGuideStepProps {
    guideStep: IGuideItem,
    isEdit: boolean
}

const GuideStep: FC<IGuideStepProps> = ({guideStep, isEdit}) => {
    const breadCrumbsCount = useAppSelector(state => getBreadCrumbsCount(state));
    const guideId = useParams().guideId || "0";
    return (
        <Paper sx={{padding: "16px"}}>
            <Stack spacing={3}>
                <GuideStepHeader breadCrumbsCount={breadCrumbsCount}
                                 guideId={guideId}
                                 guideStep={guideStep}
                                 isEdit={isEdit}/>
                <GuideStepMain breadCrumbsCount={breadCrumbsCount}
                               guideStep={guideStep}
                               isEdit={isEdit}/>
                <GuideStepUploadFile guideId={guideId}
                                     guideStep={guideStep}
                                     isEdit={isEdit}/>
            </Stack>
        </Paper>
    );
};

export default GuideStep;