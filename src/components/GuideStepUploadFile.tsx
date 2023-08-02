import React, {FC} from 'react';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import {Chip} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {fetchRemoveFile, fetchUpdateGuide, fetchUploadFile} from "../services/actions/guidesActionsCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {editionGuideUpdateFile} from "../services/reducers/guides";
import {getGuideById, getIsNewGuide} from "../services/selectors/guidesSelectors";
import {IGuideItem} from "../models/iGuide";

interface IGuideStepUploadFileProps {
    guideStep: IGuideItem
    isEdit: boolean
    guideId: string
}

const GuideStepUploadFile: FC<IGuideStepUploadFileProps> = ({guideStep, isEdit, guideId}) => {
    const dispatch = useAppDispatch()
    const isNewGuide = useAppSelector(state => getIsNewGuide(state))
    const editionGuide = useAppSelector(state => getGuideById(state, guideId, isEdit, isNewGuide))


    const handleRemove = (e: any) => {
        if (guideStep.file && guideStep.file.name) {
            dispatch(fetchRemoveFile(guideStep.file.name))
            dispatch(editionGuideUpdateFile({fileName: "", filePath: "", guideStepId: guideStep.id}))
            if (!isNewGuide) {
                dispatch(fetchUpdateGuide(editionGuide))
            }
        }
    }
    return (
        <Grid container spacing={2} justifyContent="space-between">
            <Grid>
                {guideStep.file && guideStep.file.name && (
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Chip
                            label={guideStep.file.name.slice(13)}
                            component="a"
                            href={guideStep.file.path}
                            icon={<DownloadIcon />}
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
            </Grid>
        </Grid>
    );
};

export default GuideStepUploadFile;