import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { Container, Box, Typography } from "@material-ui/core";
import TokenService from "../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import MainLocationComp from "../../components/Locations/MainLocationComp";

const locations = ({ jwt }: { jwt: string }) => {
  return (
    <AdminLayout>
      <Container>
        <Box mt={3}>
          <Typography align="center" variant="h4">
            Configure Cities
          </Typography>
          <MainLocationComp jwt={jwt} />
        </Box>
      </Container>
    </AdminLayout>
  );
};

locations.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);
  await tokenService.authenticateAdmin(ctx, token);

  return {
    jwt: token,
  };
};

export default locations;
