import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Box,
  Typography,
  MenuItem,
} from "@material-ui/core";

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
}
const AdsControlPanel = ({ adsCount }: AdsControlPanelProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined">
      <Box p={4}>
        <Grid container spacing={1}>
          <Grid container item xs={6} spacing={2}>
            <Grid container item xs={12}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="search-id"
                  label="Search"
                  variant="outlined"
                  name="Search"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="search-id"
                  label="Search"
                  variant="outlined"
                  name="Search"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="category-id"
                label="Category"
                variant="outlined"
                name="Category"
                select
              >
                <MenuItem value="Kazkas">Kazkas</MenuItem>
                <MenuItem value="Kazkas">Kazkas</MenuItem>
                <MenuItem value="Kazkas">Kazkas</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="type-id"
                label="Buy/Sell"
                variant="outlined"
                name="type"
                select
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="buy">Buy</MenuItem>
              </TextField>
            </Grid>
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
