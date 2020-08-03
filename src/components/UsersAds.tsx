import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostCard from "./PostCard";
import { Grid, Link, Typography, Button, Paper } from "@material-ui/core";
import { IAd } from "../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";

const UsersAds = () => {
  const Router = useRouter();
  const [dataState, setDataState] = useState<IAd | undefined>();

  useEffect(() => {
    Axios.get("/api/computers/v1/user/tst")
      .then((res) => {
        setDataState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderSkeletonsForAds() {
    const n: number = 5; // number of ad Skeletons

    return [...Array(n)].map((e, i) => (
      <Grid key={i} item xs={12}>
        <Skeleton variant="rect" width={"100%"} height={200} />
      </Grid>
    ));
  }

  function renderAds() {
    if (dataState!.content.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography>No ads created!</Typography>
        </Grid>
      );
    } else {
      return dataState!.content.map((ad) => (
        <Grid key={ad.id} item container>
          <Grid item xs={10}>
            <Link style={{ textDecoration: "none" }} href={`/posts/${ad.id}`}>
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
                edit={true}
                id={ad.id}
              />
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Paper style={{ height: "100%" }}>
              <Button
                onClick={() =>
                  Router.push("/posts/edit/[id]", `/posts/edit/${ad.id}`)
                }
              >
                EDIT
              </Button>
              <Button
                onClick={() =>
                  Router.push("/posts/edit/[id]", `/posts/edit/${ad.id}`)
                }
              >
                DELETE
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ));
    }
  }

  return (
    <Grid container item spacing={1}>
      {dataState ? renderAds() : renderSkeletonsForAds()}
    </Grid>
  );
};

export default UsersAds;
