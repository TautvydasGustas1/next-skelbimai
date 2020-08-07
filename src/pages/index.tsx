import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import PostCard from "../components/PostCard";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { IAd } from "../types/PostsInterface";
import { ICategories } from "../types/CategoriesInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import AdsControlPanel from "../components/AdsControlPanel";
import { GetServerSideProps } from "next";
import Link from "next/link";

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

export default function Home({ queryParams }: any) {
  const classes = useStyles();
  const [dataState, setDataState] = useState<IAd | undefined>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPagination, setLoadingPagination] = useState(true);
  const [categoriesDataState, setCategoriesDataState] = useState<
    ICategories[] | undefined
  >();

  const handlePageChange = (e: object, page: number) => {
    setPage(page - 1);
  };

  const getAds = () => {
    setLoading(true);
    axios
      .get(`/api/computers/v1?page=${page}&size=${size}&sort=${order}`)
      .then((res) => {
        setDataState(res.data);
        setLoading(false);
        setLoadingPagination(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getCategories = () => {
    axios
      .get(`/api/categories/v1`)
      .then((res) => {
        setCategoriesDataState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAds();
  }, [page]);

  useEffect(() => {
    getCategories();
  }, []);

  function renderAds() {
    //Render not found ads
    if (dataState?.content.length === 0) {
      return (
        <Box textAlign="center" width="100%">
          <Typography variant="h6">Sorry no ads found :/</Typography>
        </Box>
      );
    } else {
      //Render Ads
      return dataState!.content.map((ad) => (
        <Link key={ad.id} as={`/posts/${ad.id}`} href={`/posts/[id]`}>
          <Grid item xs={12}>
            <Box style={{ cursor: "pointer" }}>
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
                id={ad.id}
              />
            </Box>
          </Grid>
        </Link>
      ));
    }
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
              <AdsControlPanel
                dataState={dataState}
                setDataState={setDataState}
                queryParams={queryParams}
                categories={categoriesDataState}
                adsCount={dataState?.page.totalElements}
                setLoading={setLoading}
                setLoadingPagination={setLoadingPagination}
              />
            </Grid>
            <Grid container spacing={2} item xs={12}>
              <Grid item xs={12}>
                {loadingPagination ? (
                  <Skeleton variant="rect" width={450} height={40} />
                ) : dataState && dataState.page.totalPages > 0 ? (
                  <Pagination
                    onChange={(e: object, page: number) =>
                      handlePageChange(e, page)
                    }
                    color="primary"
                    count={dataState?.page.totalPages}
                  />
                ) : (
                  ""
                )}
              </Grid>
              {console.log(dataState)}
              <Grid container item xs={12} spacing={3}>
                {!loading && dataState ? renderAds() : renderSkeletonsForAds()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      queryParams: ctx.query,
    },
  };
};
