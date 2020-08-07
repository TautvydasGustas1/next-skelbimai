import React from "react";
import { Container, Box, Paper, Typography } from "@material-ui/core";
import Layout from "../../../../components/Layout";
import ImagesDropzone from "../../../../components/ImagesDropzone";
import { makeStyles } from "@material-ui/core/styles";
import TokenService from "../../../../Helpers/TokenHelper";
import { NextPageContext } from "next";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
  },
}));

const EditPictures = ({ jwt }: any) => {
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <Box mt={3}>
          <Box height="300px" mb={1}>
            <Paper className={classes.paper} variant="outlined">
              <Typography align="center" variant="h4">
                Current Images
              </Typography>
            </Paper>
          </Box>
          <Box mb={1}>
            <Typography variant="h4" align="center">
              Add new images
            </Typography>
          </Box>
          <ImagesDropzone jwt={jwt} />
        </Box>
      </Container>
    </Layout>
  );
};

EditPictures.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
  };
};

export default EditPictures;
