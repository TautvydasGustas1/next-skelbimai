import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { IExternal } from "../../types/ExternalInterface";

interface RenderInfoProps {
  post: IExternal;
}

const RenderExternalInfo = ({ post }: RenderInfoProps) => (
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
      <Typography variant="body1">Wireless</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1">
        <b>{post!.wireless}</b>
      </Typography>
    </Grid>
  </Grid>
);

export default RenderExternalInfo;
