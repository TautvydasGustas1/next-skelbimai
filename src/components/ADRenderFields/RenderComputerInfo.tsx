import React from "react";
import { IComputers } from "../../types/ComputersInterface";
import { Grid, Typography } from "@material-ui/core";

interface RenderComputerInfoProps {
  post: IComputers;
}

const RenderComputerInfo = ({ post }: RenderComputerInfoProps) => (
  <Grid spacing={1} container item xs={12}>
    <Grid item xs={6}>
      <Typography variant="body1">CPU</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.cpu}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">Motherboard</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.motherboard}</b>
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">GPU</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.gpu}</b>
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

export default RenderComputerInfo;
