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
}

const AdsControlPanel = ({
  adsCount,
  categories,
  queryParams,
}: AdsControlPanelProps) => {
  const category = queryParams.category ? queryParams.category : "all";
  const subCategory = queryParams.sub_category
    ? queryParams.sub_category
    : "all";

  const classes = useStyles();

  const [currentCategory, setCurrentCategory] = useState(category);
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

  useEffect(() => {
    if (currentCategory !== "all") {
      getSubCategorieByName();
    }
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

  const renderPanelData = (
    <>
      <Grid container item xs={12}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="category-id"
            label="Category"
            variant="outlined"
            name="category"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="search-id"
            label="Search"
            variant="outlined"
            name="search"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="miestas-id"
            label="Miestas"
            variant="outlined"
            name="miestas"
          />
        </Grid>
      </Grid>
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
            <MenuItem value="all">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      {subCategoriesState && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="sub-id"
            label="Sub Category"
            variant="outlined"
            name="sub"
            select
            value={currentSubCategory}
            onChange={(e) => setCurrentSubCategory(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {subCategoriesState.sub_categories.map((sub) => (
              <MenuItem key={sub.id} value={sub.sub_category}>
                {sub.sub_category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="type-id"
          label="Buy/Sell"
          variant="outlined"
          name="type"
          select
          onChange={(e) => setTypeState(e.target.value)}
          value={typeState}
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
          <MenuItem value="buy">Buy</MenuItem>
        </TextField>
      </Grid>
    </>
  );

  return (
    <Paper className={classes.root} variant="outlined">
      <Box p={4}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
            {categories ? renderPanelData : skeletonPanelParams}
          </Grid>
          <Grid container item xs={6}></Grid>
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
