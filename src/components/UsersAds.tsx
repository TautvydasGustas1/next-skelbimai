import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostCard from "./PostCard";
import { Grid, Typography, Button, Paper, Box } from "@material-ui/core";
import { IAd } from "../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import { useAlert } from "../context/AlertContext";
import Link from "next/link";

const UsersAds = ({ jwt, userID }: any) => {
  const Router = useRouter();
  const [dataState, setDataState] = useState<IAd | undefined>();
  const [alertState, alertDispatch] = useAlert();

  useEffect(() => {
    let didCancel = false;
    if (userID !== -1) {
      Axios.get(`/api/computers/v1/user/${userID}`)
        .then((res) => {
          if (!didCancel) setDataState(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      didCancel = true;
    };
  }, []);

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
          //Remove from array
          let data: any = dataState;
          const content = dataState?.content.filter((item) => {
            return id !== item.id;
          });

          data.content = content;
          //setDataState(data);
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

  function renderNoAds() {
    return (
      <Grid item xs={12}>
        <Box m={2}>
          <Typography align="center">No ads created!</Typography>
        </Box>
      </Grid>
    );
  }

  function renderAds() {
    if (dataState!.content.length === 0) {
      return renderNoAds();
    } else {
      return dataState!.content.map((ad) => (
        <Grid key={ad.id} item container>
          <Link as={`/posts/${ad.id}`} href={`/posts/[id]`}>
            <Grid style={{ cursor: "pointer" }} item xs={9}>
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
            </Grid>
          </Link>
          <Grid item xs={3}>
            <Paper style={{ height: "100%" }}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() =>
                  Router.push("/posts/edit/[id]", `/posts/edit/${ad.id}`)
                }
              >
                EDIT
              </Button>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => {}}
              >
                Edit pictures
              </Button>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => removeAd(ad.id)}
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
      {dataState
        ? renderAds()
        : userID === -1
        ? renderNoAds()
        : renderSkeletonsForAds()}
    </Grid>
  );
};

export default UsersAds;
