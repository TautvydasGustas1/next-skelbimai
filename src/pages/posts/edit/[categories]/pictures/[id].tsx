import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  CardMedia,
  Card,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import Layout from "../../../../../components/Layout";
import ImagesDropzone from "../../../../../components/ImagesDropzone";
import { makeStyles } from "@material-ui/core/styles";
import TokenService from "../../../../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import NavService from "../../../../../Helpers/NavigationHelper";
import Axios from "axios";
import { useAlert } from "../../../../../context/AlertContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "inherit",
  },
  img: {
    height: "250px",
    backgroundSize: "contain",
  },
  button: {
    color: "red",
  },
  noImages: {
    lineHeight: 6,
  },
}));

const EditPictures = ({ jwt, serverImages, category }: any) => {
  const classes = useStyles();
  const [images, setImages] = useState(serverImages);
  const [alertState, alertDispatch] = useAlert();

  function handleDeleteImage(id: number) {
    if (confirm("Are you sure?")) {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      Axios.delete(`/api/${category}/v1/images/delete/${id}`, config)
        .then((res) => {
          console.log(res);
          //Remove image from array
          const filtered = images.filter((item: any) => item.id !== id);
          setImages(filtered);
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully deleted an image!",
              severity: "success",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Failed to delete an image!",
              severity: "error",
            },
          });
        });
    }
  }

  return (
    <Layout>
      <Container>
        <Box mt={3}>
          {console.log(images)}
          <Box mb={2}>
            <Typography align="center" variant="h4">
              Current Images
            </Typography>
          </Box>
          {images.length !== 0 ? (
            <Grid container spacing={2}>
              {images.map((img: any) => (
                <Grid key={img.id} item md={6} xs={12} lg={4}>
                  <Card variant="outlined" elevation={0}>
                    <CardMedia className={classes.img} image={img.url} />
                  </Card>
                  <CardActions>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      fullWidth
                      size="small"
                      color="primary"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box height="150px" mb={2}>
              <Paper variant="outlined" className={classes.paper}>
                <Typography
                  className={classes.noImages}
                  align="center"
                  variant="h5"
                >
                  No images
                </Typography>
              </Paper>
            </Box>
          )}
          <Box mb={1} mt={2}>
            <Typography variant="h4" align="center">
              Add new images
            </Typography>
          </Box>
          <ImagesDropzone jwt={jwt} />
        </Box>
      </Container>
    </Layout>
  );
};

EditPictures.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  const id = await ctx.query.id;
  const category = ctx.query.categories;
  const nav = new NavService();
  let images = [];

  try {
    const res = await Axios.get(`/api/${category}/v1/${id}`);
    images = res.data.images;
  } catch (err) {
    nav.redirectUser("/404", ctx);
  }

  return {
    jwt: token,
    serverImages: images,
    category,
  };
};

export default EditPictures;
