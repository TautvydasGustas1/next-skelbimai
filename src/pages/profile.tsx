import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { NextPageContext } from "next";
import {
  Box,
  Container,
  CardContent,
  Card,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Tabs,
  Paper,
  Tab,
} from "@material-ui/core";
import Layout from "../components/Layout";
import Alert from "@material-ui/lab/Alert";
import { IUserInfo } from "../types/UserInfoInterface";
import Link from "next/link";
import TokenService from "../Helpers/TokenHelper";
import { makeStyles } from "@material-ui/core/styles";
import UsersAds from "../components/UsersAds";

export interface IProfileProps {
  jwt: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Profile = ({ jwt }: IProfileProps) => {
  const classes = useStyles();
  const [userInfoState, setUserInfoState] = useState<IUserInfo>({
    name: "",
    city: "",
    county: "",
    email: "",
    number: "",
    id: -1,
  });
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileEmpty, setProfileEmpty] = useState(true);

  const alert = (
    <Box mb={1}>
      <Alert
        severity="info"
        action={
          <Link href="/profile/edit">
            <Button color="inherit" size="small">
              Update profile
            </Button>
          </Link>
        }
      >
        Setup profile for faster ads creation!
      </Alert>
    </Box>
  );

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
      validateStatus: () => true,
    };

    axios
      .get("/api/users/information/v1", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const obj: IUserInfo = {
            name: res.data.name,
            city: res.data.city,
            county: res.data.county,
            email: res.data.email,
            number: res.data.number,
            id: res.data.id,
          };
          console.log(res.data);
          setUserInfoState(obj);
          setProfileEmpty(false);
        }
        setProfileUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadingIndicator = (
    <Box p={3} textAlign={"center"}>
      <CircularProgress />
    </Box>
  );
  const profileContent = (
    <>
      {profileEmpty && alert}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Name:</b> {userInfoState.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Phone number:</b> {userInfoState.number}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>County:</b> {userInfoState.county}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>City:</b> {userInfoState.city}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Email:</b> {userInfoState.email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Link href="/profile/edit">
              <Button variant="outlined" color={"inherit"}>
                Update profile
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );

  function renderInfo() {
    switch (value) {
      case 0:
        return profileContent;
        break;
      case 1:
        return <UsersAds jwt={jwt} userID={userInfoState.id} />;
        break;
      default:
        return <div></div>;
        break;
    }
  }

  function renderTitle() {
    return (
      <Typography variant="h4" align="center">
        {value === 0 ? "Personal information" : "Your created ads"}
      </Typography>
    );
  }

  return (
    <Layout>
      <Container>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="User information" />
                <Tab label="Your ads" />
              </Tabs>
              <Box mt={3}>
                <Box mb={1}>{renderTitle()}</Box>
                {!profileUpdated ? loadingIndicator : renderInfo()}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

Profile.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
  };
};

export default Profile;
