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

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "300px",
  },
  caption: {
    color: "grey",
  },
}));

export interface AdsControlPanelProps {
  adsCount?: number;
  categories?: ICategories[];
  queryParams: any;
  setDataState: any;
  dataState: any;
}

const AdsControlPanel = ({
  adsCount,
  categories,
  queryParams,
  setDataState,
  dataState,
}: AdsControlPanelProps) => {
  const subCategory = queryParams.sub_category
    ? queryParams.sub_category
    : "all";

  const classes = useStyles();

  const [currentCategory, setCurrentCategory] = useState("Kompiuteriai");
  const [typeState, setTypeState] = useState("any");
  const [subCategoriesState, setSubCategoriesState] = useState<
    ICategories | undefined
  >();
  const [currentSubCategory, setCurrentSubCategory] = useState(subCategory);

  const getSubCategorieByName = () => {
    axios
      .get(`/api/categories/v1/category?category=${currentCategory}`)
      .then((res) => {
        console.log(res);
        setSubCategoriesState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   if (currentCategory !== "all") {
  //     getSubCategorieByName();
  //   }
  // }, [currentCategory]);

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

  function renderCategoryFields() {
    return <SearchByComputers setDataState={setDataState} />;
  }

  const renderPanelData = (
    <>
      <Box mb={3} width={"100%"}>
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
      </Box>
      {renderCategoryFields()}
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
            {adsCount && (
              <Typography className={classes.caption} variant="caption">
                Number of ads {adsCount}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AdsControlPanel;
