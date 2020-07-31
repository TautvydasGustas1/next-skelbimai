import React, { SyntheticEvent, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IImages } from "../types/ImagesInterface";

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: "45px",
    minHeight: "45px",
    maxWidth: "76px",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    padding: "3%",
    width: "84px",
  },
  active: {
    border: "1px solid rgb(126 123 123 / 90%)",
  },
}));

export interface ImageCarouselProps {
  images: IImages[];
  setMainImage: (arg: number) => void;
  mainImageIndex: number;
  handleFallbackImage: (arg: SyntheticEvent<HTMLImageElement, Event>) => void;
}

let lastImageIndex = 0;

const ImageCarousel = ({
  images,
  setMainImage,
  mainImageIndex,
  handleFallbackImage,
}: ImageCarouselProps) => {
  const classes = useStyles();

  const handleClick = (indx: number) => {
    lastImageIndex = mainImageIndex;
    setMainImage(indx);
  };

  const handleImageHover = (indx: number) => () => {
    setMainImage(indx);
  };

  const handleImageLeaveHover = () => () => {
    setMainImage(lastImageIndex);
  };

  const [defaultImage, setDefaultImage] = useState("/photos/noImage.png");

  return (
    <Grid container>
      {images.map((img, i) => (
        <Grid key={i} item lg={2}>
          <Paper
            onMouseLeave={handleImageLeaveHover()}
            onMouseEnter={handleImageHover(i)}
            square
            className={`${classes.paper} ${
              i === mainImageIndex && classes.active
            }`}
            elevation={0}
            variant="outlined"
            onClick={() => handleClick(i)}
          >
            <img
              onError={(e) => {
                img.url = defaultImage;
              }}
              src={img.url}
              className={classes.image}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageCarousel;
