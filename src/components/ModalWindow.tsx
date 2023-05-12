import React, {FC} from 'react';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";

interface IModalWindowProps {
    isOpenModal: boolean
    handleToggleOpen: () => void
    children: React.ReactNode
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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