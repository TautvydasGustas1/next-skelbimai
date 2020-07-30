import React, { useState, SyntheticEvent } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageModal from "../../components/ImageModal";
import ImageCarousel from "../../components/ImageCarousel";
import ImageProduct from "../../components/ImageProduct";
import NavService from "../../Helpers/NavigationHelper";
import { IComputers } from "../../types/ComputersInterface";

const useStyles = makeStyles((theme) => ({
  outerPostsContainer: {
    paddingTop: theme.spacing(3),
  },
  descriptionCard: {
    width: "100%",
  },
  infoContainer: {
    minHeight: "400px",
  },
  carouselGrid: {
    marginTop: "3%",
  },
}));

const defaultImage = "/photos/noImage.png";

export interface AdvertisementProps {
  post?: IComputers;
}

const Advertisement = ({ post }: AdvertisementProps) => {
  const [imageModalState, setImageModalState] = useState(false);
  const [mainImageIndex, setMainImage] = useState(0);

  const handleOpenImageModal = () => {
    setImageModalState(true);
  };

  const handleCloseImageModal = () => {
    setImageModalState(false);
  };

  const handleFallbackImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  const classes = useStyles();
  return (
    <Layout>
      {!post ? (
        <div>Car not found</div>
      ) : (
        <Container>
          <ImageModal
            images={post!.images}
            open={imageModalState}
            handleClose={handleCloseImageModal}
            mainImageIndex={mainImageIndex}
          />
          <div className={classes.outerPostsContainer}>
            <Grid container spacing={2}>
              <Grid container item xs={12} md={6} lg={5}>
                <Grid item xs={12} sm={12} lg={12}>
                  <ImageProduct
                    title={post.article}
                    images={post.images}
                    mainImageIndex={mainImageIndex}
                    handleOpenImageModal={handleOpenImageModal}
                    setMainImageIndex={setMainImage}
                  />
                </Grid>
                <Grid className={classes.carouselGrid} item xs={12} lg={12}>
                  <ImageCarousel
                    setMainImage={setMainImage}
                    images={post.images}
                    mainImageIndex={mainImageIndex}
                    handleFallbackImage={handleFallbackImage}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={7}>
                <Card variant="outlined" className={classes.infoContainer}>
                  <CardContent>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="h4">{post.article}</Typography>
                      </Grid>
                      <Grid container item xs={12}>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {post.type}|
                            <b>
                              {post.price === 0 ? "Free" : post.price + "€"}
                            </b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography align="right" variant="body1">
                            Miestas: <b>{post.city}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid spacing={1} container item xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="caption">
                            <b>About</b>
                          </Typography>
                          <Divider />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">CPU</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <b>{post.cpu}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Motherboard</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <b>{post.motherboard}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">GPU</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <b>{post.gpu}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Ram</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <b>{post.ram}</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Memory</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <b>{post.memory}</b>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          <b>Description</b>
                        </Typography>
                        <Divider />
                        <Box mt={1}>
                          <Typography variant="body1">
                            {post.description}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = await ctx.params?.id;
  const nav = new NavService();
  console.log(id);
  let post = "";

  const res = await axios.get(`/api/computers/v1/${id}`);
  if (res.status !== 200) {
    nav.redirectUser("/404", ctx);
  }
  post = await res.data;
  return { props: { post } };
};

export default Advertisement;
