import React, {FC} from 'react';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {modalStyle} from "./NewGuideAddOptionModal";

interface IModalWindowProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
    children: React.ReactNode
}

const ModalWindow: FC<IModalWindowProps> = ({isOpenModal, handleToggleOpen, children}) => {
    return (
        <Modal
            open={isOpenModal}
            onClose={handleToggleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWindow;