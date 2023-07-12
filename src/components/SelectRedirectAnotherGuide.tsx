import React, {FC} from 'react';
import {IGuide} from "../models/iGuide";
import ModalWindow from "./ModalWindow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SelectRedirectAnotherGuideItem from "./SelectRedirectAnotherGuideItem";
import {List} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";

interface ISelectRedirectAnotherGuideProps {
    isOpen: boolean
    anotherGuides: IGuide[]
    toggleIsOpen: () => void
}

const SelectRedirectAnotherGuide: FC<ISelectRedirectAnotherGuideProps> = ({
                                                                              isOpen,
                                                                              anotherGuides,
                                                                              toggleIsOpen
                                                                          }) => {
    const anotherGuideList = anotherGuides.map((guide, index) => (<SelectRedirectAnotherGuideItem key={guide.id}
                                                                                                  guide={guide}
                                                                                                  index={index}
                                                                                                  toggleIsOpen={toggleIsOpen}/>))

    return (
        <ModalWindow isOpenModal={isOpen} handleToggleOpen={toggleIsOpen}>
            <Stack spacing={2}>
                <Typography variant={"h3"} fontSize={16} fontWeight={600}>
                    Выберите на какой гайд перенаправить текущий шаг
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
                    <ListSubheader> Гайды вашей категории:</ListSubheader>
                    {anotherGuideList ? anotherGuideList : "Нет гайдов вашей категории"}
                </List>
                <Typography fontSize={12} fontWeight={300}>
                    Кликнете по нужному гайду и текущий этап будет ссылаться на него. После выбора вы будете
                    перенаправлены на предыдущий шаг.
                </Typography>
            </Stack>
        </ModalWindow>
    );
};

export default SelectRedirectAnotherGuide;