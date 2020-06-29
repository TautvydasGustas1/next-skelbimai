import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import axios from 'axios';
import { Post } from '../api/posts/[post]';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageModal from '../../components/ImageModal';
import ImageCarousel from '../../components/ImageCarousel';
import ImageProduct from '../../components/ImageProduct';

const useStyles = makeStyles((theme) => ({
    outerPostsContainer: {
        paddingTop: theme.spacing(3),
    },
    descriptionCard: {
        width: '100%',
    },
    infoContainer: {
        height: '400px',
    },
    carouselGrid: {
        marginTop: '3%',
    },
}));

export interface AdvertisementProps {
    post?: Post;
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

    const classes = useStyles();
    return (
        <Layout>
            {!post ? (
                <div>Car not found</div>
            ) : (
                <Container>
                    <ImageModal
                        images={post!.pictures}
                        open={imageModalState}
                        handleClose={handleCloseImageModal}
                        mainImageIndex={mainImageIndex}
                    />
                    <div className={classes.outerPostsContainer}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} md={6} lg={5}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <ImageProduct
                                        title={post.name}
                                        images={post.pictures}
                                        mainImageIndex={mainImageIndex}
                                        handleOpenImageModal={
                                            handleOpenImageModal
                                        }
                                        setMainImageIndex={setMainImage}
                                    />
                                </Grid>
                                <Grid
                                    className={classes.carouselGrid}
                                    item
                                    xs={12}
                                    lg={12}
                                >
                                    <ImageCarousel
                                        setMainImage={setMainImage}
                                        images={post.pictures}
                                        mainImageIndex={mainImageIndex}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6} lg={7}>
                                <Card className={classes.infoContainer}>
                                    <CardContent>
                                        <Typography variant='h4'>
                                            {post.name}
                                        </Typography>
                                        <Typography>
                                            Price: {post.price + '€'}
                                        </Typography>
                                        <Typography>
                                            {post.description}
                                        </Typography>
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
    const id = ctx.params?.id;
    const res = await axios.get(`/posts/${id}`);
    const post: Post | undefined = res.data;
    return { props: { post } };
};

export default Advertisement;
