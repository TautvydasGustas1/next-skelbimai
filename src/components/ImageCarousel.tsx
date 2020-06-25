import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        maxHeight: '45px',
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '3%',
        width: '84px',
    },
    active: {
        border: '1px solid rgba(0, 0, 0, 0.9)',
    },
}));

export interface ImageCarouselProps {
    images: string[];
    setMainImage: (arg: number) => void;
    mainImageIndex: number;
}

let lastImageIndex = 0;

const ImageCarousel = ({
    images,
    setMainImage,
    mainImageIndex,
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
                        variant='outlined'
                        onClick={() => handleClick(i)}
                    >
                        <img
                            src={`/photos/phones/${img}`}
                            className={classes.image}
                        />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageCarousel;
