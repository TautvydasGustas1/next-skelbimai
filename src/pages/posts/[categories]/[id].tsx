import React, { useState, SyntheticEvent } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../../components/Layout";
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
import ImageModal from "../../../components/ImageModal";
import ImageCarousel from "../../../components/ImageCarousel";
import ImageProduct from "../../../components/ImageProduct";
import NavService from "../../../Helpers/NavigationHelper";
import { IComputers } from "../../../types/ComputersInterface";
import RenderComputerInfo from "../../../components/ADRenderFields/RenderComputerInfo";
import { computersURL, phonesURL } from "../../../Utils/GlobalVariales";
import RenderPhoneInfo from "../../../components/ADRenderFields/RenderPhonesInfo";

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
  categoryURL?: string;
}

const Advertisement = ({ post, categoryURL }: AdvertisementProps) => {
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

  function renderInfo() {
    return (
      <Grid spacing={1} container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="caption">
            <b>Personal information</b>
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>Name</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {post!.personal_information.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>Email</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {post!.personal_information.email}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>Number</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {post!.personal_information.number}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>City</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {post!.personal_information.city}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function renderProdutInfo(post: any) {
    switch (categoryURL) {
      case phonesURL: {
        return <RenderPhoneInfo post={post} />;
      }
      case computersURL: {
        return <RenderComputerInfo post={post} />;
      }
      default: {
        return <div>Empty</div>;
      }
    }
  }

  const classes = useStyles();
  return (
    <Layout>
      {!post ? (
        <Box>
          <Typography>No ad found</Typography>
        </Box>
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
                      <Box width="100%">
                        <Typography variant="caption">
                          <b>About</b>
                        </Typography>
                        <Divider />
                      </Box>
                      {renderProdutInfo(post)}
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
                      {post.personal_information && renderInfo()}
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
  let post = [];
  const categoryURL = ctx.params?.categories;

  try {
    const res = await axios.get(`/api/${ctx.query.categories}/v1/${id}`);
    post = await res.data;
  } catch (err) {
    nav.redirectUser("/404", ctx);
  }
  return { props: { post, categoryURL } };
};

export default Advertisement;
