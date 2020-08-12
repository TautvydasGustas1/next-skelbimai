import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Box,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { ICategories } from "../types/CategoriesInterface";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchByComputers from "./SearchByComponents/SearchByComputers";
import { AnyRecord } from "dns";
import {
  computersURL,
  functionAddSlugsToObjects,
  phonesURL,
  consolURL,
  externalURL,
  monitorsURL,
} from "../Utils/GlobalVariales";
import Axios from "axios";
import SearchByPhones from "./SearchByComponents/SearchByPhones";
import SearchByConsol from "./SearchByComponents/SearchByConsol";
import SearchByExternal from "./SearchByComponents/SearchByExternal";
import SearchByMonitors from "./SearchByComponents/SearchByMonitors";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "300px",
  },
  caption: {
    color: "grey",
  },
}));

const size = 20;

export interface AdsControlPanelProps {
  adsCount?: number;
  categories?: ICategories[];
  queryParams: any;
  setDataState: any;
  setLoading: any;
  setLoadingPagination: any;
  currentCategory: any;
  setCurrentCategory: any;
  currentSubCategory: any;
  setCurrentSubCategory: any;
  currentURL: string;
}

const AdsControlPanel = ({
  adsCount,
  categories,
  queryParams,
  setDataState,
  setLoading,
  setLoadingPagination,
  currentCategory,
  setCurrentCategory,
  currentSubCategory,
  setCurrentSubCategory,
  currentURL,
}: AdsControlPanelProps) => {
  const classes = useStyles();

  const [typeState, setTypeState] = useState("any");
  const [subCategoriesState, setSubCategoriesState] = useState([]);

  const [citiesState, setCitiesState] = useState([]);

  const getSubCategorieByName = () => {
    axios
      .get(`/api/categories/v1/category?category=${currentCategory}`)
      .then((res) => {
        setSubCategoriesState(res.data.sub_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getCities() {
    axios
      .get("/api/cities/v1")
      .then((res) => {
        setCitiesState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    getSubCategorieByName();
  }, [currentCategory]);

  const skeletonPanelParams = (
    <>
      <Grid item xs={12}>
        <Skeleton variant="rect" height={50} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" height={50} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rect" height={50} />
      </Grid>
    </>
  );

  const handleSearchSubmit = async (values: any) => {
    setLoading(true);
    setLoadingPagination(true);
    //Weird fix but ok ;/
    if (currentSubCategory === "all") {
      values.sub_category = "";
    } else {
      values.sub_category = currentSubCategory;
    }
    if (values.city === "any") {
      values.city = "";
    }
    await Axios.post(`/api/${currentURL}/v1/search?size=${size}`, values)
      .then((res) => {
        res.data.content = functionAddSlugsToObjects(
          res.data.content,
          currentURL
        );
        //Check if empty
        if (!res.data.empty) {
          setDataState(res.data);
        }
        setLoading(false);
        setLoadingPagination(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function renderCategoryFields(slug: string) {
    switch (slug) {
      case computersURL: {
        return (
          <SearchByComputers
            handleSearchSubmit={handleSearchSubmit}
            citiesState={citiesState}
          />
        );
      }
      case phonesURL: {
        return (
          <SearchByPhones
            handleSearchSubmit={handleSearchSubmit}
            citiesState={citiesState}
          />
        );
      }
      case consolURL: {
        return (
          <SearchByConsol
            handleSearchSubmit={handleSearchSubmit}
            citiesState={citiesState}
          />
        );
      }
      case externalURL: {
        return (
          <SearchByExternal
            handleSearchSubmit={handleSearchSubmit}
            citiesState={citiesState}
          />
        );
      }
      case monitorsURL: {
        return (
          <SearchByMonitors
            handleSearchSubmit={handleSearchSubmit}
            citiesState={citiesState}
          />
        );
      }
    }
  }

  const renderPanelData = (
    <>
      <Box mb={3} width={"100%"}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {categories && (
              <TextField
                fullWidth
                id="category-id"
                label="Category"
                variant="outlined"
                name="category"
                select
                onChange={(e) => setCurrentCategory(e.target.value)}
                value={currentCategory}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.category}>
                    {cat.category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12}>
            {subCategoriesState && (
              <TextField
                fullWidth
                id="subCategory-id"
                label="Sub Category"
                variant="outlined"
                name="subCategory"
                select
                onChange={(e) => setCurrentSubCategory(e.target.value)}
                value={currentSubCategory}
              >
                <MenuItem value="all">All</MenuItem>
                {subCategoriesState!.map((cat: any) => (
                  <MenuItem key={cat.id} value={cat.sub_category}>
                    {cat.sub_category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box width="100%">{renderCategoryFields(currentURL)}</Box>
    </>
  );

  return (
    <Paper className={classes.root} variant="outlined">
      <Box p={4}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
            {categories ? renderPanelData : skeletonPanelParams}
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.caption} variant="caption">
              Number of ads {adsCount}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AdsControlPanel;
