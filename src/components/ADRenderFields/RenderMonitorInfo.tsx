import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { IMonitors } from "../../types/MonitorsInterface";

interface RenderInfoProps {
  post: IMonitors;
}

const RenderMonitorsInfo = ({ post }: RenderInfoProps) => (
  <Grid spacing={1} container item xs={12}>
    <Grid item xs={6}>
      <Typography variant="body1">Brand</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.brand}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Model</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.model}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Refresh Rate</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.refresh_rate}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Resolution</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.resolution}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Response Time</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.response_time}</b>
      </Typography>
    </Grid>
  </Grid>
);

export default RenderMonitorsInfo;
