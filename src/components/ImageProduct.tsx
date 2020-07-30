import React from "react";
import { Card, CardMedia, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { IImages } from "../types/ImagesInterface";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    height: "400px",
  },
  image: {
    height: "100%",
    cursor: "pointer",
    backgroundSize: "contain",
  },
  outerContainter: {
    height: "100%",
    position: "relative",
  },
  arrowContainerOuter: {
    position: "absolute",
    top: "50%",
    width: "100%",
  },
  leftArrowContainer: {
    position: "absolute",
  },
  rightArrowContainer: {
    position: "absolute",
    right: 0,
  },
  arrowButton: {
    backgroundColor: "rgba(255, 255, 255, 0.13)",
  },
}));

export interface ImageProductProps {
  mainImageIndex: number;
  title: string;
  images: IImages[];
  handleOpenImageModal: () => void;
  setMainImageIndex: (arg: number) => void;
}

const ImageProduct = ({
  images,
  mainImageIndex,
  title,
  handleOpenImageModal,
  setMainImageIndex,
}: ImageProductProps) => {
  const classes = useStyles();

  const handleNextImage = () => () => {
    if (mainImageIndex !== images.length - 1 && images.length !== 0)
      setMainImageIndex(mainImageIndex + 1);
  };

  const handlePrevImage = () => () => {
    if (mainImageIndex !== 0) setMainImageIndex(mainImageIndex - 1);
  };

  const disabledLeftArrow = mainImageIndex === 0;
  const disabledRightArrow =
    mainImageIndex === images.length - 1 || images.length === 0;

  return (
    <Card variant="outlined" className={classes.imageContainer}>
      <div className={classes.outerContainter}>
        <span className={classes.arrowContainerOuter}>
          <span className={classes.leftArrowContainer}>
            <IconButton
              className={classes.arrowButton}
              disableRipple
              disabled={disabledLeftArrow}
              onClick={handlePrevImage()}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </span>
          <span className={classes.rightArrowContainer}>
            <IconButton
              className={classes.arrowButton}
              disableRipple
              disabled={disabledRightArrow}
              onClick={handleNextImage()}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </span>
        </span>
        <CardMedia
          onClick={() => handleOpenImageModal()}
          className={classes.image}
          image={
            images.length > 0
              ? images[mainImageIndex].url
              : "/photos/noImage.png"
          }
          title={title}
        />
      </div>
    </Card>
  );
};

export default ImageProduct;
