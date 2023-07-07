import React, {FC} from 'react';
import ModalWindow from "./ModalWindow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {IGuideItem} from "../models/iGuide";
import SelectGuideStepResultItem from "./SelectGuideStepResultItem";
import ListSubheader from "@mui/material/ListSubheader";
import {List} from "@mui/material";

interface ISelectGuideStepResultProps {
    isOpenSelectResultWindow: boolean
    results: IGuideItem []
    toggleIsOpenSelectResultWindow: () => void
}

const SelectGuideStepResult: FC<ISelectGuideStepResultProps> = ({
                                                                    isOpenSelectResultWindow,
                                                                    toggleIsOpenSelectResultWindow,
                                                                    results
                                                                }) => {
    const resultsList = results.map((result, index) => (<SelectGuideStepResultItem key={result.id}
                                                                                   index={index}
                                                                                   result={result}
                                                                                   toggleIsOpenSelectResultWindow={toggleIsOpenSelectResultWindow}/>))
    return (
        <ModalWindow isOpenModal={isOpenSelectResultWindow} handleToggleOpen={toggleIsOpenSelectResultWindow}>
            <Stack spacing={2}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600}>
                    Выберите на какой результат перенаправить текущий шаг
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
                    <ListSubheader> Существующие результаты</ListSubheader>
                    {resultsList}
                </List>
                <Typography fontSize={12} fontWeight={300}>
                    Кликнете по нужному результату и текущий этап будет ссылаться на него. После выбора вы будете
                    перенаправлены на предыдущий шаг.
                </Typography>
            </Stack>
        </ModalWindow>
    );
};

export default SelectGuideStepResult;