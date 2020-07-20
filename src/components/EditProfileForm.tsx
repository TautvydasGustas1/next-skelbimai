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
} from "@material-ui/core";
import { IUserInfo } from "../types/UserInfoInterface";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const initialValues: IUserInfo = {
  name: "",
  phone: "",
  city: "",
  email: "",
  county: "",
};

const EditProfileForm = () => {
  const classes = useStyles();

  const handleSubmit = async (values: IUserInfo, resolve: () => void) => {
    await Axios.post("/api/users/information/v1", values)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        console.log(errors.message);
      })
      .finally(() => {
        resolve();
      });
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
                      name="phone"
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
                    ></Field>
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
