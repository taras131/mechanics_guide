import React, {FC} from 'react';
import ModalWindow from "./ModalWindow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {IGuideItem} from "../models/iGuide";
import SelectRedirectGuideStepItem from "./SelectRedirectGuideStepItem";
import ListSubheader from "@mui/material/ListSubheader";
import {List} from "@mui/material";

interface ISelectGuideStepResultProps {
    isOpenSelectRedirectWindow: boolean
    guideSteps: IGuideItem []
    toggleIsOpenSelectRedirectWindow: () => void
}

const SelectRedirectGuideStep: FC<ISelectGuideStepResultProps> = ({
                                                                      isOpenSelectRedirectWindow,
                                                                      toggleIsOpenSelectRedirectWindow,
                                                                      guideSteps
                                                                  }) => {
    const resultsList = guideSteps.map((guideStep, index) => (<SelectRedirectGuideStepItem key={guideStep.id}
                                                                                         index={index}
                                                                                           guideStep={guideStep}
                                                                                           toggleIsOpenSelectRedirectWindow={toggleIsOpenSelectRedirectWindow}/>))
    return (
        <ModalWindow isOpenModal={isOpenSelectRedirectWindow} handleToggleOpen={toggleIsOpenSelectRedirectWindow}>
            <Stack spacing={2}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600}>
                    Выберите на какой этап перенаправить текущий шаг
                </Typography>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': {padding: 0},
                    }}
                    subheader={<li/>}
                >
                    <ListSubheader> Существующие этапы:</ListSubheader>
                    {resultsList}
                </List>
                <Typography fontSize={12} fontWeight={300}>
                    Кликнете по нужному этапу и текущий этап будет ссылаться на него. После выбора вы будете
                    перенаправлены на предыдущий шаг.
                </Typography>
            </Stack>
        </ModalWindow>
    );
};

export default SelectRedirectGuideStep;