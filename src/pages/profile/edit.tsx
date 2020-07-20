import React from "react";
import { makeStyles, Container, Box } from "@material-ui/core";
import EditProfileForm from "../../components/EditProfileForm";
import Layout from "../../components/Layout";
import { NextPageContext } from "next";
import TokenService from "../../Helpers/TokenHelper";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export interface ProfileEditProps {
  jwt: string;
}

const ProfileEdit = ({ jwt }: ProfileEditProps) => {
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <Box pt={3}>
          <EditProfileForm jwt={jwt} />
        </Box>
      </Container>
    </Layout>
  );
};

ProfileEdit.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
  };
};

export default ProfileEdit;
