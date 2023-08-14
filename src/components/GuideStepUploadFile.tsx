import React, {FC} from 'react';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import {Chip} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {fetchRemoveFile, fetchUpdateGuide} from "../services/actions/guidesActionsCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {editionGuideUpdateFile} from "../services/reducers/guides";
import {getGuideById, getGuideMode} from "../services/selectors/guidesSelectors";
import {IGuideItem} from "../models/iGuide";
import Typography from "@mui/material/Typography";
import {GUIDE_MODE} from "../utils/const";

interface IGuideStepUploadFileProps {
    guideStep: IGuideItem
    isEdit: boolean
    guideId: string
}

const GuideStepUploadFile: FC<IGuideStepUploadFileProps> = ({guideStep, isEdit, guideId}) => {
    const dispatch = useAppDispatch()
    const guideMode = useAppSelector(state => getGuideMode(state))
    const editionGuide = useAppSelector(state => getGuideById(state,guideId, guideMode))
    const handleRemove = (e: any) => {
        if (guideStep.file && guideStep.file.name) {
            dispatch(fetchRemoveFile(guideStep.file.name))
            dispatch(editionGuideUpdateFile({fileName: "", filePath: "", guideStepId: guideStep.id}))
            if (guideMode !== GUIDE_MODE.new_guide) {
                dispatch(fetchUpdateGuide(editionGuide))
            }
        }
    }
    return (
        <>
            {guideStep.file && guideStep.file.name && (
                <Stack spacing={1} direction="row" alignItems="center" mt={2}>
                    <Typography fontWeight={500} fontSize={"14px"}>
                        Прикреплён файл:
                    </Typography>
                    <Chip
                        label={guideStep.file.name.slice(13)}
                        component="a"
                        href={guideStep.file.path}
                        icon={<DownloadIcon/>}
                        color="primary"
                        clickable
                    />
                    {isEdit && (
                        <IconButton aria-label="remove" onClick={handleRemove}>
                            <CloseIcon/>
                        </IconButton>
                    )}
                </Stack>
            )}

        </>
    );
};

export default GuideStepUploadFile;