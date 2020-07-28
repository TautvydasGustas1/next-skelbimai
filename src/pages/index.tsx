import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Paper } from "@material-ui/core";
import PostCard from "../components/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { IAd } from "../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";

const size = "20";
const order = "desc";

const useStyles = makeStyles((theme) => ({
  outerPostsContainer: {
    paddingTop: theme.spacing(3),
  },
  sideController: {
    minHeight: "300px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [dataState, setDataState] = useState<IAd | undefined>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(true);

  const handlePageChange = (e: object, page: number) => {
    setPage(page - 1);
  };

  const getAds = () => {
    setLoading(true);
    axios
      .get(`/api/computers/v1?page=${page}&size=${size}&sort=${order}`)
      .then((res) => {
        console.log(res);
        setDataState(res.data);
        setLoading(false);
        setLoadingPagination(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAds();
  }, [page]);

  function renderAds() {
    return dataState!.content.map((ad) => (
      <Grid key={ad.id} item xs={12}>
        <PostCard
          article={ad.article}
          city={ad.city}
          cpu={ad.cpu}
          gpu={ad.gpu}
          description={ad.description}
          images={ad.images}
          memory={ad.memory}
          motherboard={ad.motherboard}
          price={ad.price}
          ram={ad.ram}
          sub_category={ad.sub_category}
          type={ad.type}
        />
      </Grid>
    ));
  }

  function renderSkeletonsForAds() {
    const n: number = 5; // number of ad Skeletons

    return [...Array(n)].map((e, i) => (
      <Grid key={i} item xs={12}>
        <Skeleton variant="rect" width={"100%"} height={200} />
      </Grid>
    ));
  }

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
                  {loadingPagination ? (
                    <Skeleton variant="rect" width={450} height={40} />
                  ) : (
                    <Pagination
                      onChange={(e: object, page: number) =>
                        handlePageChange(e, page)
                      }
                      color="primary"
                      count={dataState?.page.totalPages}
                    />
                  )}
                </Grid>
                {!loading ? renderAds() : renderSkeletonsForAds()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}
