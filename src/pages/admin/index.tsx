import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { GetServerSideProps, NextPageContext } from "next";
import Link from "next/link";
import AdminLayout from "../../components/AdminLayout";
import AdsControlPanel from "../../components/AdsControlPanel";
import PostCard from "../../components/PostCard";
import { ICategories } from "../../types/CategoriesInterface";
import { IAd } from "../../types/PostsInterface";
import Skeleton from "@material-ui/lab/Skeleton";
import { useAlert } from "../../context/AlertContext";
import Axios from "axios";
import TokenService from "../../Helpers/TokenHelper";

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

export default function Admin({ queryParams, jwt }: any) {
  // const classes = useStyles();
  // const [dataState, setDataState] = useState<IAd | undefined>();
  // const [page, setPage] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [loadingPagination, setLoadingPagination] = useState(true);
  // const [categoriesDataState, setCategoriesDataState] = useState<
  //   ICategories[] | undefined
  // >();
  // const [alertState, alertDispatch] = useAlert();

  // const handlePageChange = (e: object, page: number) => {
  //   setPage(page - 1);
  // };

  // const getAds = () => {
  //   setLoading(true);
  //   axios
  //     .get(`/api/computers/v1?page=${page}&size=${size}&sort=${order}`)
  //     .then((res) => {
  //       setDataState(res.data);
  //       setLoading(false);
  //       setLoadingPagination(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  // const getCategories = () => {
  //   axios
  //     .get(`/api/categories/v1`)
  //     .then((res) => {
  //       setCategoriesDataState(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getAds();
  // }, [page]);

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // function removeAd(id: any) {
  //   if (confirm("Are you sure?")) {
  //     const config = {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     };
  //     Axios.delete(`/api/computers/v1/${id}`, config)
  //       .then((res) => {
  //         alertDispatch({
  //           type: "showAlert",
  //           payload: {
  //             message: "Successfully removed an ad!",
  //             severity: "success",
  //           },
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  // function renderAds() {
  //   return dataState!.content.map((ad) => (
  //     <Grid item key={ad.id} container spacing={1}>
  //       <Link key={ad.id} as={`/posts/${ad.id}`} href={`/posts/[id]`}>
  //         <Grid item xs={10}>
  //           <Box style={{ cursor: "pointer" }}>
  //             <PostCard
  //               article={ad.article}
  //               city={ad.city}
  //               cpu={ad.cpu}
  //               gpu={ad.gpu}
  //               description={ad.description}
  //               images={ad.images}
  //               memory={ad.memory}
  //               motherboard={ad.motherboard}
  //               price={ad.price}
  //               ram={ad.ram}
  //               sub_category={ad.sub_category}
  //               type={ad.type}
  //               id={ad.id}
  //             />
  //           </Box>
  //         </Grid>
  //       </Link>
  //       <Grid item xs={2}>
  //         <Box>
  //           <Button
  //             style={{ color: "red" }}
  //             variant="outlined"
  //             onClick={() => {
  //               removeAd(ad.id);
  //             }}
  //           >
  //             Delete
  //           </Button>
  //         </Box>
  //       </Grid>
  //     </Grid>
  //   ));
  // }

  // function renderSkeletonsForAds() {
  //   const n: number = 5; // number of ad Skeletons

  //   return [...Array(n)].map((e, i) => (
  //     <Grid key={i} item xs={12}>
  //       <Skeleton variant="rect" width={"100%"} height={200} />
  //     </Grid>
  //   ));
  // }

  return (
    <AdminLayout>
      {/* <div className={classes.outerPostsContainer}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <AdsControlPanel
                dataState={dataState}
                setDataState={setDataState}
                queryParams={queryParams}
                categories={categoriesDataState}
                adsCount={dataState?.page.totalElements}
              />
            </Grid>
            <Grid container spacing={2} item xs={12}>
              <Grid item xs={12}>
                {loadingPagination ? (
                  <Skeleton variant="rect" width={450} height={40} />
                ) : dataState ? (
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
              <Grid container item xs={12} spacing={3}>
                {!loading && dataState ? renderAds() : renderSkeletonsForAds()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div> */}
    </AdminLayout>
  );
}

Admin.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
    queryParams: ctx.query,
  };
};
