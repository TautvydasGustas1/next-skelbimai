import Axios from "axios";
import { useState } from "react";
import { ICategories } from "../../types/CategoriesInterface";
import { IAd } from "../../types/PostsInterface";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const withAdvertisements = (WrappedComponent: any) => {
  const size = "20";
  const order = "desc";

  const [loading, setLoading] = useState(true);
  const [dataState, setDataState] = useState<IAd | undefined>();
  const [loadingPagination, setLoadingPagination] = useState(true);
  const [categoriesDataState, setCategoriesDataState] = useState<
    ICategories[] | undefined
  >();
  const [page, setPage] = useState(0);

  const getAds = () => {
    setLoading(true);

    Axios.get(`/api/computers/v1?page=${page}&size=${size}&sort=${order}`)
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
    Axios.get(`/api/categories/v1`)
      .then((res) => {
        setCategoriesDataState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (e: object, page: number) => {
    setPage(page - 1);
  };

  function renderSkeletonsForAds() {
    const n: number = 5; // number of ad Skeletons

    return [...Array(n)].map((e, i) => (
      <Grid key={i} item xs={12}>
        <Skeleton variant="rect" width={"100%"} height={200} />
      </Grid>
    ));
  }
  return (props: any) => {
    <WrappedComponent
      {...props}
      getAds={getAds}
      page={page}
      getCategories={getCategories}
      dataState={dataState}
      categoriesDataState={categoriesDataState}
      loadingPagination={loadingPagination}
      handlePageChange={handlePageChange}
      loading={loading}
      renderSkeletonsForAds={renderSkeletonsForAds}
    />;
  };
};
