import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { IPhones } from "../../types/PhonesInterface";

interface RenderInfoProps {
  post: IPhones;
}

const RenderPhoneInfo = ({ post }: RenderInfoProps) => (
  <Grid spacing={1} container item xs={12}>
    <Grid item xs={6}>
      <Typography variant="body1">Manufacturer</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.manufacturer}</b>
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
      <Typography variant="body1">Os</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.os}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Camera</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.camera}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Ram</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.ram}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Memory</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.memory}</b>
      </Typography>
    </Grid>
  </Grid>
);

export default RenderPhoneInfo;
