import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {fetchRemoveFile, fetchUpdateGuide, fetchUploadFile} from "../services/actions/guidesActionsCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IGuideItem} from "../models/iGuide";
import CloseIcon from '@mui/icons-material/Close';
import {editionGuideUpdateFile} from "../services/reducers/guides";
import Grid from "@mui/material/Unstable_Grid2";
import {Chip} from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {getGuideById, getIsNewGuide} from "../services/selectors/guidesSelectors";

interface IGuideStepUploadFileProps {
    guideStep: IGuideItem
    isEdit: boolean
    guideId: string
}

const GuideStepUploadFile: FC<IGuideStepUploadFileProps> = ({guideStep, isEdit, guideId}) => {
    const dispatch = useAppDispatch()
    const isNewGuide = useAppSelector(state => getIsNewGuide(state))
    const editionGuide = useAppSelector(state => getGuideById(state, guideId, isEdit, isNewGuide))
    const updateFilePath = (fileName: string, filePath: string) => {
        dispatch(editionGuideUpdateFile({fileName: fileName, filePath: filePath, guideStepId: guideStep.id}))
    }
    const handleChangeInputFile = (e: any) => {
        if (guideStep.file && guideStep.file.name) {
            dispatch(fetchRemoveFile(guideStep.file.name))
        }
        dispatch(fetchUploadFile({file: e.target.files[0], guideStepId: guideStep.id, updateFilePath: updateFilePath}))
        if (!isNewGuide) {
            dispatch(fetchUpdateGuide(editionGuide))
        }
    }
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
            <Grid>
                {isEdit && (
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        {guideStep.file && guideStep.file.name ? "Заменить файл" : "Прикрепить файл"}
                        <input
                            type="file"
                            hidden
                            onChange={handleChangeInputFile}
                        />
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default GuideStepUploadFile;