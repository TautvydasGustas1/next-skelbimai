import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostCard from "./PostCard";
import { Grid, Link, Typography, Button, Paper, Box } from "@material-ui/core";
import { IAd } from "../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import { useAlert } from "../context/AlertContext";

const UsersAds = ({ jwt }: any) => {
  const Router = useRouter();
  const [dataState, setDataState] = useState<IAd | undefined>();
  const [alertState, alertDispatch] = useAlert();

  useEffect(() => {
    let didCancel = false;
    Axios.get("/api/computers/v1/user/tst")
      .then((res) => {
        if (!didCancel) setDataState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      didCancel = true;
    };
  }, [removeAd]);

  function renderSkeletonsForAds() {
    const n: number = 5; // number of ad Skeletons

    return [...Array(n)].map((e, i) => (
      <Grid key={i} item xs={12}>
        <Skeleton variant="rect" width={"100%"} height={200} />
      </Grid>
    ));
  }

  function removeAd(id: any) {
    if (confirm("Are you sure?")) {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      Axios.delete(`/api/computers/v1/${id}`, config)
        .then((res) => {
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully removed an ad!",
              severity: "success",
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function renderAds() {
    if (dataState!.content.length === 0) {
      return (
        <Grid item xs={12}>
          <Box m={2}>
            <Typography align="center">No ads created!</Typography>
          </Box>
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
              <Button onClick={() => removeAd(ad.id)}>DELETE</Button>
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
