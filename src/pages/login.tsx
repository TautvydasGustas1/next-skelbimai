import React from "react";
import Layout from "../components/Layout";
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import Link from "next/link";
import { object, string } from "yup";
import axios from "axios";
import Cookie from "js-cookie";
import Router from "next/router";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  OuterSubmitContainer: {
    textAlign: "center",
  },
}));

export interface LoginInterface {
  username: string;
  password: string;
}

const initialValues: LoginInterface = {
  username: "",
  password: "",
};

const login = () => {
  const classes = useStyles();
  const [state, dispatch] = useAuth();
  const [alertState, alertDispatch] = useAlert();

  const handleSubmit = async (values: LoginInterface, resolve: () => void) => {
    await axios
      .post("/api/users/v1/login", values)
      .then((res) => {
        //Set cookies
        Cookie.set("auth", res.data.access_token, {
          sameSite: "strict",
        });
        dispatch({ type: "setAuth" });
        // Redirect to profile
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully logged in!",
            severity: "success",
          },
        });
        Router.push("/profile");
      })
      .catch((errors) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: errors.response.data.error,
            severity: "error",
          },
        });
      })
      .finally(() => {
        resolve();
      });
  };

  return (
    <Layout
      title="Best skelbimai | Login"
      description="Login to best skelbimai website"
    >
      <Container>
        <Box pt={3}>
          <Card className={classes.Card}>
            <CardContent>
              <Formik
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={object({
                  username: string().required(),
                  password: string().required().min(6),
                })}
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
                      <Grid xs={12} item>
                        <Typography align="center" variant="h5">
                          Log in
                        </Typography>
                      </Grid>
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          as={TextField}
                          label="Username"
                          name="username"
                          variant="outlined"
                          type="username"
                          error={Boolean(errors.username)}
                          helperText={errors.username}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          as={TextField}
                          label="Password"
                          name="password"
                          variant="outlined"
                          type={"password"}
                          error={Boolean(errors.password)}
                          helperText={errors.password}
                        />
                      </Grid>
                      <Grid
                        xs={12}
                        item
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                      >
                        <Box textAlign="right">
                          <Link href="/register">
                            <Button color="primary" size="small">
                              Not yet registered?
                            </Button>
                          </Link>
                        </Box>
                      </Grid>
                      <Grid xs={12} item>
                        <div className={classes.OuterSubmitContainer}>
                          <Button
                            disabled={isSubmitting}
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                          >
                            Login
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

export default login;
