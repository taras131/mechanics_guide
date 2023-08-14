import React, {FC, useId} from 'react';
import {FormControl, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {changeEditionGuideTitle} from "../services/reducers/guides";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {CENTER, FORM_CONTROL_HEIGHT_PX, GUIDE_MODE, H3, LEFT, OUTLINED} from "../utils/const";
import {validateText} from "../utils/services";
import {getGuidesTitlesWithGuideIdFilter} from "../services/selectors/guidesSelectors";
import {useParams} from "react-router-dom";

interface IProps {
    guideTitle: string
    guideMode: GUIDE_MODE
    matches_900: boolean
    titleError: string
    setTitleError: (errorText: string) => void
}

const textFieldLabel = "Заголовок гайда";

const GuideHeaderTitle: FC<IProps> = ({
                                          guideTitle,
                                          guideMode,
                                          matches_900,
                                          titleError,
                                          setTitleError
                                      }) => {
    const dispatch = useAppDispatch()
    const textFieldId = useId()
    const guideId = useParams().guideId || "0";
    const existingGuidesTitles = useAppSelector(state => getGuidesTitlesWithGuideIdFilter(state, guideId))
    const handleGuideNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateText(e.target.value, setTitleError, existingGuidesTitles, 5)
        dispatch(changeEditionGuideTitle(e.target.value))
    }
    return (
        <Stack>
            {guideMode === GUIDE_MODE.viewing
                ? (<Typography variant={H3}
                               fontSize={matches_900 ? "37px" : "25px"}
                               fontWeight={matches_900 ? 700 : 600}
                               textAlign={matches_900 ? LEFT : CENTER}
                               sx={{marginTop: "-5px", lineHeight: matches_900 ? "50px" : "40px"}}>
                    {guideTitle}
                </Typography>)
                : (<FormControl sx={{minHeight: FORM_CONTROL_HEIGHT_PX}}>
                    <TextField value={guideTitle}
                               onChange={handleGuideNameChange}
                               id={textFieldId}
                               label={textFieldLabel}
                               variant={OUTLINED}
                               fullWidth
                               helperText={titleError}/>
                </FormControl>)
            }
        </Stack>
    );
};

export default GuideHeaderTitle;