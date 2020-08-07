import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IImages } from "../types/ImagesInterface";
import theme from "./theme";

const useStyles = makeStyles({
  root: {},
  media: {
    maxWidth: "100%",
    width: "100%",
    height: "200px",
  },
  CardMediaContainer: {
    width: "100%",
    height: "200px",
    backgroundColor: "grey",
  },
  descriptionContainer: {
    [theme.breakpoints.down("md")]: {
      maxHeight: "64px",
    },
    maxHeight: "75px",
    overflow: "hidden",
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  text: {
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  },
  deleteButton: {
    color: "red",
  },
});

export interface IPostCardPorps {
  article: string;
  city: string;
  cpu: string;
  gpu: string;
  description: string;
  images: IImages[];
  memory: string;
  motherboard: string;
  price: number;
  sub_category: string;
  type: string;
  ram: string;
  edit?: Boolean;
  id: number;
}

const maxDescriptionLenght = 150;

const PostCard = ({
  article,
  city,
  cpu,
  gpu,
  description,
  images,
  memory,
  motherboard,
  price,
  ram,
  sub_category,
  type,
  edit,
  id,
}: IPostCardPorps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4} lg={2}>
          <Box
            className={classes.CardMediaContainer}
            justifyContent="center"
            textAlign="center"
          >
            <CardMedia
              className={classes.media}
              image={images[0] ? images[0].url : "/photos/noImage.png"}
              title="Image name"
            />
          </Box>
        </Grid>
        <Grid item xs={8} lg={10}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.title} variant="h6">
                  {article}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.text} variant="body1">
                  {type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={`${classes.descriptionContainer} ${classes.text}`}
                  variant="body1"
                >
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.text} variant="body1">
                  <b>{city}</b> | <b> {price === 0 ? "Free" : `${price}€`}</b>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostCard;
