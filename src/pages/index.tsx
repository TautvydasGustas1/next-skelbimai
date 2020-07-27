import React from "react";
import Container from "@material-ui/core/Container";
import { Grid, Paper } from "@material-ui/core";
import PostCard from "../components/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import axios from "axios";
import { Posts } from "./api/posts";

const useStyles = makeStyles((theme) => ({
  outerPostsContainer: {
    paddingTop: theme.spacing(3),
  },
  sideController: {
    minHeight: "300px",
  },
}));

// export async function getServerSideProps() {
//   const res = await axios.get("/posts");
//   const posts: Posts[] | undefined = await res.data;

//   return {
//     props: { posts }, // will be passed to the page component as props
//   };
// }

export default function Home() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.outerPostsContainer}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Paper className={classes.sideController} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
                  <PostCard />
                </Grid>
                <Grid item xs={12}>
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
