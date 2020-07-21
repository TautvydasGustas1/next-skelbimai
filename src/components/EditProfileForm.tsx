import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  makeStyles,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { IUserInfo } from "../types/UserInfoInterface";
import Axios from "axios";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export interface EditProfileFormProps {
  jwt: string;
  profileData: IUserInfo;
}

const EditProfileForm = ({ jwt, profileData }: EditProfileFormProps) => {
  const classes = useStyles();

  const handleSubmit = async (values: IUserInfo, resolve: () => void) => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    if (profileData === undefined) {
      await Axios.post("/api/users/information/v1", values, config)
        .then((res) => {
          // Redirect to profile
          Router.push("/profile");
        })
        .catch((errors) => {
          console.log(errors.message);
        })
        .finally(() => {
          resolve();
        });
    } else {
      await Axios.put("/api/users/information/v1", values, config)
        .then((res) => {
          console.log(res);
          // Redirect to profile
          Router.push("/profile");
        })
        .catch((errors) => {
          console.log(errors.message);
        })
        .finally(() => {
          resolve();
        });
    }
  };

  const initialValues: IUserInfo = {
    name: profileData ? profileData.name : "",
    number: profileData ? profileData.number : "",
    city: profileData ? profileData.city : "",
    email: profileData ? profileData.email : "",
    county: profileData ? profileData.county : "",
    id: profileData && profileData.id,
  };

  return (
    <Box>
      <Card className={classes.Card}>
        <Box textAlign="center" p={3}>
          <Typography variant="h4">Update profile</Typography>
        </Box>
        <CardContent>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              return new Promise((res) => {
                handleSubmit(values, res);
              });
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="name"
                      as={TextField}
                      variant="outlined"
                      label="Name"
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="number"
                      type="tel"
                      as={TextField}
                      variant="outlined"
                      label="Phone number"
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="county"
                      as={TextField}
                      variant="outlined"
                      label="County"
                      select
                    >
                      <MenuItem value="Kazkas">Kazkas</MenuItem>
                      <MenuItem value="Kazkas">Kazkas</MenuItem>
                      <MenuItem value="Kazkas">Kazkas</MenuItem>
                      <MenuItem value="Kazkas">Kazkas</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="city"
                      as={TextField}
                      variant="outlined"
                      label="City name"
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="email"
                      as={TextField}
                      type="email"
                      variant="outlined"
                      label="Email"
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button
                        disabled={isSubmitting}
                        color="primary"
                        variant="outlined"
                        type="submit"
                      >
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfileForm;
