import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { IConsol } from "../../types/ConsolInterface";

interface RenderInfoProps {
  post: IConsol;
}

const RenderConsolInfo = ({ post }: RenderInfoProps) => (
  <Grid spacing={1} container item xs={12}>
    <Grid item xs={6}>
      <Typography variant="body1">Memory</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.memory}</b>
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
      <Typography variant="body1">Color</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.color}</b>
      </Typography>
    </Grid>
  </Grid>
);

export default RenderConsolInfo;
