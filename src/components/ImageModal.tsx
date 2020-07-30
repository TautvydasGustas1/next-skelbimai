import React, { useState, useEffect } from "react";
import { Modal, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { IImages } from "../types/ImagesInterface";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    height: "100%",
  },
  modalExitContainer: {
    position: "relative",
  },
  modalExitInner: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 999,
  },
  imageContainerInner: {
    position: "relative",
    height: "inherit",
  },
  image: {
    position: "absolute",
    top: "0",
    bottom: "0",
    margin: "auto",
    left: "0",
    right: "0",
    height: "auto",
    maxHeight: "100%",
  },
  arrowContainerOuter: {
    position: "relative",
  },
  arrowButtonLeft: {
    position: "absolute",
    top: "50%",
    left: "10px",
  },
  arrowButtonRight: {
    position: "absolute",
    top: "50%",
    right: "3px",
  },
  arrowIcon: {
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  closeButton: {
    borderRadius: 0,
    "&:hover, &.Mui-focusVisible": { backgroundColor: "white" },
    backgroundColor: "white",
  },
  arrowButton: {
    color: "black",
  },
}));

export interface ImageModalProps {
  open: boolean;
  handleClose: () => void;
  images: IImages[];
  mainImageIndex: number;
}
const ImageModal = ({
  open,
  handleClose,
  images,
  mainImageIndex,
}: ImageModalProps) => {
  const classes = useStyles();

  const [imageIndex, setImageIndex] = useState(mainImageIndex);

  useEffect(() => {
    setImageIndex(mainImageIndex);
  }, [mainImageIndex]);

  const handleNextImage = () => () => {
    if (imageIndex !== images.length - 1 && images.length !== 0)
      setImageIndex(imageIndex + 1);
  };

  const handlePrevImage = () => () => {
    if (imageIndex !== 0) setImageIndex(imageIndex - 1);
  };

  const disabledLeftArrow = imageIndex === 0;
  const disabledRightArrow =
    imageIndex === images.length - 1 || images.length === 0;

  const body = (
    <div className={classes.modalContainer}>
      <div className={classes.modalExitContainer}>
        <div className={classes.modalExitInner}>
          <IconButton
            className={classes.closeButton}
            onClick={() => handleClose()}
            color="primary"
            aria-label="close"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <div className={classes.imageContainerInner}>
        <img
          className={classes.image}
          src={
            images.length > 0 ? images[imageIndex].url : "/photos/noImage.png"
          }
        />
        <div>
          <IconButton
            disableRipple
            disabled={disabledLeftArrow}
            onClick={handlePrevImage()}
            className={`${classes.arrowButtonLeft} ${classes.arrowButton}`}
            color="primary"
            aria-label="previous-image"
          >
            <ArrowBackIosIcon className={classes.arrowIcon} />
          </IconButton>
          <IconButton
            disableRipple
            disabled={disabledRightArrow}
            onClick={handleNextImage()}
            className={`${classes.arrowButtonRight} ${classes.arrowButton}`}
            color="primary"
            aria-label="next-image"
          >
            <ArrowForwardIosIcon className={classes.arrowIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ImageModal;
