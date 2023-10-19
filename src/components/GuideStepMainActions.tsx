import React, {FC, useState} from "react";
import {
    ADD_OPTION_LABEL,
    ADD_OPTION_SUBHEADER_TEXT,
    ADD_OPTION_TITLE,
    CENTER,
    GUIDE_ITEM_TYPE, GUIDE_MODE,
    ROW,
} from "../utils/const";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddNewStringValueModal from "./AddNewStringValueModal";
import {editionGuideStepAddOption, editionGuideUpdateFile, setIsUploadFileLoading} from "../services/reducers/guides";
import {getNextId} from "../utils/services";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IGuideItem, IGuideItemOption} from "../models/iGuide";
import SelectRedirectAnotherGuide from "./SelectRedirectAnotherGuide";
import {
    getEditionGuideStepsByType,
    getGuideById, getGuideMode,
    getGuidesWithFilter,
    getIsUploadFileLoading,
} from "../services/selectors/guidesSelectors";
import {useParams} from "react-router-dom";
import SelectRedirectGuideStep from "./SelectRedirectGuideStep";
import {fetchRemoveFile, fetchUpdateGuide, fetchUploadFile} from "../services/actions/guidesActionsCreators";
import Grid from "@mui/material/Unstable_Grid2";
import {getLastBreadCrumbs} from "../services/selectors/breadCrumbsSelectors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import RedoIcon from "@mui/icons-material/Redo";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LoadingButton from "@mui/lab/LoadingButton";


interface IProps {
    options: IGuideItemOption []
    guideStep: IGuideItem
    guideStepType: GUIDE_ITEM_TYPE
}

const GuideStepMainActions: FC<IProps> = ({options, guideStep, guideStepType}) => {
    const guideId = useParams().guideId || "0";
    const dispatch = useAppDispatch();
    const guideMode = useAppSelector(state => getGuideMode(state));
    const lastBreadCrumbs = useAppSelector(state => getLastBreadCrumbs(state));
    const editionGuide = useAppSelector(state => getGuideById(state, guideId, guideMode));
    const isUploadFileLoading = useAppSelector(state => getIsUploadFileLoading(state));
    const [isOpenNewOptionWindow, setIsOpenNewOptionWindow] = useState(false);
    const [isOpenSelectRedirectWindow, setIsOpenSelectRedirectWindow] = useState(false);
    const [isOpenSelectRedirectAnotherGuideWindow, setIsOpenSelectRedirectAnotherGuideWindow] = useState(false);
    const currentGuide = useAppSelector(state => getGuideById(state, guideId, guideMode));
    const anotherGuides = useAppSelector(state => getGuidesWithFilter(state, currentGuide.categoryId, false))
        .filter(guide => guide.id !== guideId);
    const guideSteps = useAppSelector(state => getEditionGuideStepsByType(state, guideStepType))
        .filter(step => step.id !== guideStep.id).filter(step => step.text !== "");
    const optionsTexts = options.map(option => option.text);
    const handleAddOptionClick = (newOptionText: string) => {
        dispatch(editionGuideStepAddOption({
            guideStepId: guideStep.id,
            newOption: {
                id: getNextId() - 200,
                nextId: getNextId(),
                text: newOptionText,
            },
        }));
    };
    const updateFilePath = (fileName: string, filePath: string) => {
        dispatch(editionGuideUpdateFile({fileName: fileName, filePath: filePath, guideStepId: guideStep.id}));
    };
    const handleChangeInputFile = (e: any) => {
        dispatch(setIsUploadFileLoading(true));
        if (guideStep.file && guideStep.file.name) {
            dispatch(fetchRemoveFile(guideStep.file.name));
        }
        dispatch(fetchUploadFile({file: e.target.files[0], guideStepId: guideStep.id, updateFilePath: updateFilePath}));
        if (guideMode !== GUIDE_MODE.new_guide) {
            dispatch(fetchUpdateGuide(editionGuide));
        }
    };
    const toggleIsOpenNewOptionWindow = () => {
        setIsOpenNewOptionWindow(prev => !prev);
    };
    const toggleIsOpenSelectRedirectAnotherGuideWindow = () => {
        setIsOpenSelectRedirectAnotherGuideWindow(prev => !prev);
    };
    const toggleIsOpenSelectRedirectWindow = () => {
        setIsOpenSelectRedirectWindow(prev => !prev);
    };
    return (
        <>
            <Grid container spacing={1} mt={3}>
                <Grid xs={12} sm={6} md={3}>
                    <Button disabled={!lastBreadCrumbs || anotherGuides.length === 0}
                            startIcon={<MergeTypeIcon/>}
                            variant="outlined"
                            fullWidth
                            onClick={toggleIsOpenSelectRedirectAnotherGuideWindow}>
                        Другой гайд
                    </Button>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Button disabled={!lastBreadCrumbs || guideSteps.length === 0}
                            startIcon={<RedoIcon/>}
                            variant="outlined"
                            fullWidth
                            onClick={toggleIsOpenSelectRedirectWindow}>
                        Другой этап
                    </Button>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <LoadingButton
                        variant="outlined"
                        component="label"
                        loading={isUploadFileLoading}
                        fullWidth
                        startIcon={guideStep.file && guideStep.file.name
                            ? (<AutorenewIcon/>)
                            : (<AttachFileIcon/>)}
                    >
                        {"Файл"}
                        <input
                            type="file"
                            hidden
                            onChange={handleChangeInputFile}
                        />
                    </LoadingButton>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Button onClick={toggleIsOpenNewOptionWindow}
                            variant="outlined"
                            fullWidth
                            disabled={guideStep.type === GUIDE_ITEM_TYPE.result}
                            startIcon={<AddCircleOutlineOutlinedIcon/>}>
                        Ответ
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={2}>
                <Stack direction={ROW} spacing={1} alignItems={CENTER}>
                    <MergeTypeIcon/>
                    <Typography fontSize="12px" color="inherit" fontWeight={300}>
                        Вы можете перенаправить текущий шаг на другой уже существующий гайд тойже
                        категории, что ваш гайд, если текущий шаг не является первым и существуют другие гайды той же
                        категории.
                    </Typography>
                </Stack>
                <Stack direction={ROW} spacing={1} alignItems={CENTER}>
                    <RedoIcon/>
                    <Typography fontSize="12px" color="inherit" fontWeight={300}>
                        Вы можете перенаправить текущий шаг на уже существующий, такого же типа,если текущий шаг не
                        является
                        первым и существуют другие шаги текущего типа.
                    </Typography>
                </Stack>
                {guideStep.file && guideStep.file.name
                    ? (<Stack direction={ROW} spacing={1} alignItems={CENTER}>
                        <AutorenewIcon/>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Вы можете заменить уже прикреплённый файл.
                        </Typography>
                    </Stack>)
                    : (<Stack direction={ROW} spacing={1} alignItems={CENTER}>
                        <AttachFileIcon/>
                        <Typography fontSize="12px" color="inherit" fontWeight={300}>
                            Вы можете прикрепить файл.
                        </Typography>
                    </Stack>)}
                <Stack direction={ROW} spacing={1} alignItems={CENTER}>
                    <AddCircleOutlineOutlinedIcon/>
                    <Typography fontSize="12px" color="inherit" fontWeight={300}>
                        Вы можете добавить вариант ответа, если тип текущего шага, - вопрос.
                    </Typography>
                </Stack>
            </Stack>
            <AddNewStringValueModal
                existingValues={optionsTexts}
                fieldLabelText={ADD_OPTION_LABEL}
                isOpenWindow={isOpenNewOptionWindow}
                listSubHeaderText={ADD_OPTION_SUBHEADER_TEXT}
                newValueMinLength={2}
                onAddNewValueClick={handleAddOptionClick}
                title={ADD_OPTION_TITLE}
                toggleIsOpenWindow={toggleIsOpenNewOptionWindow}/>
            <SelectRedirectAnotherGuide isOpen={isOpenSelectRedirectAnotherGuideWindow}
                                        toggleIsOpen={toggleIsOpenSelectRedirectAnotherGuideWindow}
                                        anotherGuides={anotherGuides}/>
            <SelectRedirectGuideStep isOpenSelectRedirectWindow={isOpenSelectRedirectWindow}
                                     toggleIsOpenSelectRedirectWindow={toggleIsOpenSelectRedirectWindow}
                                     guideSteps={guideSteps}/>
        </>
    );
};

export default GuideStepMainActions;