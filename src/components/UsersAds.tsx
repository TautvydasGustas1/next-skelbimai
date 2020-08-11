import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostCard from "./PostCard";
import { Grid, Typography, Button, Paper, Box } from "@material-ui/core";
import { IAd } from "../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import { useAlert } from "../context/AlertContext";
import Link from "next/link";
import {
  computersURL,
  phonesURL,
  functionAddSlugsToObjects,
} from "../Utils/GlobalVariales";

const categories = [computersURL, phonesURL];

const UsersAds = ({ jwt, userID }: any) => {
  const Router = useRouter();
  const [dataState, setDataState] = useState<any>();
  const [alertState, alertDispatch] = useAlert();

  useEffect(() => {
    if (userID !== -1) {
      console.log(getAllAds());
    }
  }, []);

  const getAllAds = () => {
    const promises: Promise<any>[] = [];
    categories.map((item) => {
      promises.push(getAds(item));
    });

    Promise.all(promises)
      .then((results) => {
        const fullData = results.reduce((arr, row) => {
          return arr.concat(row);
        }, []);
        setDataState(fullData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAds = async (categoryURL: string) => {
    return await Axios.get(`/api/${categoryURL}/v1/user/${userID}`)
      .then((res) => {
        //Add category
        res.data.content = functionAddSlugsToObjects(
          res.data.content,
          categoryURL
        );

        return res.data.content;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  function renderSkeletonsForAds() {
    const n: number = 5; // number of ad Skeletons

    return [...Array(n)].map((e, i) => (
      <Grid key={i} item xs={12}>
        <Skeleton variant="rect" width={"100%"} height={200} />
      </Grid>
    ));
  }

  function removeAd(id: any, categoryURL: string) {
    if (confirm("Are you sure?")) {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      Axios.delete(`/api/${categoryURL}/v1/${id}`, config)
        .then((res) => {
          //Remove from array
          let data: any = dataState;
          const content = dataState?.filter((item: any) => {
            return id !== item.id;
          });

          data = content;
          setDataState(data);
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
    if (dataState!.length === 0) {
      return renderNoAds();
    } else {
      {
        console.log(dataState);
      }
      return dataState!.map((ad: any) => (
        <Grid key={ad.id} item container>
          {console.log(dataState)}
          <Link
            as={`/posts/${ad.categorySlug}/${ad.id}`}
            href={`/posts/[categories]/[id]`}
          >
            <Grid style={{ cursor: "pointer" }} item xs={9}>
              <PostCard
                article={ad.article}
                city={ad.city}
                description={ad.description}
                images={ad.images}
                price={ad.price}
                type={ad.type}
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
                  Router.push(
                    "/posts/edit/[categories]/[id]",
                    `/posts/edit/${ad.categorySlug}/${ad.id}`
                  )
                }
              >
                EDIT
              </Button>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => {
                  Router.push(
                    "/posts/edit/[categories]/pictures/[id]",
                    `/posts/edit/${ad.categorySlug}/pictures/${ad.id}`
                  );
                }}
              >
                Edit pictures
              </Button>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => removeAd(ad.id, ad.categorySlug)}
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
