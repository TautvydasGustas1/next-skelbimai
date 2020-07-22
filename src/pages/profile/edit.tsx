import React from "react";
import { makeStyles, Container, Box } from "@material-ui/core";
import EditProfileForm from "../../components/EditProfileForm";
import Layout from "../../components/Layout";
import { NextPageContext } from "next";
import TokenService from "../../Helpers/TokenHelper";
import Axios from "axios";
import { IUserInfo } from "../../types/UserInfoInterface";
import { ICounties } from "../../types/CountiesInterface";

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
  profileData: IUserInfo;
  countiesWCities: ICounties[];
}

const ProfileEdit = ({
  jwt,
  profileData,
  countiesWCities,
}: ProfileEditProps) => {
  const classes = useStyles();
  return (
    <Layout>
      <Container>
        <Box pt={3}>
          <EditProfileForm
            countiesWCities={countiesWCities}
            jwt={jwt}
            profileData={profileData}
          />
        </Box>
      </Container>
    </Layout>
  );
};

ProfileEdit.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);
  let data;
  let countiesWCities;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: () => true,
  };

  //Get user info
  await Axios.get("/api/users/information/v1", config)
    .then((res) => {
      if (res.status === 200) {
        data = res.data;
      }
    })
    .catch((errors) => {
      console.log(errors.message);
    });

  //Get Counties with citys
  await Axios.get("/api/counties/v1")
    .then((res) => {
      countiesWCities = res.data;
    })
    .catch((errors) => {
      console.log(errors.message);
    });

  return {
    jwt: token,
    profileData: data,
    countiesWCities,
  };
};

export default ProfileEdit;
