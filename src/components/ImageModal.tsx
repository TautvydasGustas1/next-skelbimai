import React from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modalContainer: {
        height: '100%',
    },
    modalExitContainer: {
        position: 'relative',
    },
    modalExitInner: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

export interface ImageModalProps {
    open: boolean;
    handleClose: () => void;
    images: string[];
}
const ImageModal = ({ open, handleClose, images }: ImageModalProps) => {
    const classes = useStyles();

    const body = (
        <div className={classes.modalContainer}>
            <div className={classes.modalExitContainer}>
                <div className={classes.modalExitInner}>
                    <button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        EXIT
                    </button>
                </div>
                <div>
                    <img src={`/photos/phones/${images[0]}`} />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
            >
                {body}
            </Modal>
        </div>
    );
};

export default ImageModal;
