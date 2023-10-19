import React, {FC} from "react";
import ModalWindow from "./ModalWindow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {CENTER, ROW, SPACE_AROUND} from "../utils/const";

interface IProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
    questionText: string
    handleYesClick: () => void
}

const ModalWindowWithQuestion: FC<IProps> = ({isOpenModal, handleToggleOpen, questionText, handleYesClick}) => {
    return (
        <ModalWindow isOpenModal={isOpenModal} handleToggleOpen={handleToggleOpen}>
            <>
                <Typography fontSize={"16px"} fontWeight={600} mt={5}>
                    {questionText}
                </Typography>
                <Stack direction={ROW} spacing={2} alignItems={CENTER} justifyContent={SPACE_AROUND} mt={5} pb={5}>
                    <Button onClick={handleYesClick}>да</Button>
                    <Button onClick={handleToggleOpen}>нет</Button>
                </Stack>
            </>
        </ModalWindow>
    );
};

export default ModalWindowWithQuestion;