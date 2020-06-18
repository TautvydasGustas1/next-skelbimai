import React from 'react';
import Container from '@material-ui/core/Container';
import { Grid, Paper } from '@material-ui/core';
import PostCard from '../components/PostCard';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import axios from 'axios';
import { Posts } from './api/posts';

const useStyles = makeStyles((theme) => ({
    outerPostsContainer: {
        paddingTop: theme.spacing(3),
    },
    sideController: {
        height: '100%',
        minHeight: '700px',
    },
}));

export async function getServerSideProps() {
    const res = await axios.get('/posts');
    const posts: Posts[] | undefined = await res.data;
    return {
        props: { posts }, // will be passed to the page component as props
    };
}

export interface IndexProps {
    posts?: Posts[];
}

export default function Home({ posts }: IndexProps) {
    const classes = useStyles();
    return (
        <Layout>
            {console.log(posts?.[0].name)}
            <div className={classes.outerPostsContainer}>
                <Container>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={3}>
                            <Paper
                                className={classes.sideController}
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} lg={9}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <PostCard />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    );
}
