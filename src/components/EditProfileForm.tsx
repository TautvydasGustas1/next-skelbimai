import React, { useState, useEffect } from "react";
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
  MenuItem,
} from "@material-ui/core";
import { IUserInfo } from "../types/UserInfoInterface";
import Axios from "axios";
import Router from "next/router";
import { ICounties } from "../types/CountiesInterface";
import { object, string } from "yup";
import { useAlert } from "../context/AlertContext";

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
  countiesWCities: ICounties[];
}

const EditProfileForm = ({
  jwt,
  profileData,
  countiesWCities,
}: EditProfileFormProps) => {
  const classes = useStyles();
  const [state, dispatch] = useAlert();

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
  const [CountyState, setCountyState] = useState(initialValues.county);

  let filteredCounties = countiesWCities.filter(
    (item) => item.county === CountyState
  );

  const handleCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountyState(e.target.value);
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
            validationSchema={object({
              name: string().required(),
              number: string().required(),
              city: string().required(),
              email: string().required().email(),
              county: string().required(),
            })}
            onSubmit={(values, formikHelpers) => {
              return new Promise((res) => {
                handleSubmit(values, res);
              });
            }}
          >
            {({
              values,
              errors,
              isSubmitting,
              handleChange,
              setFieldValue,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="name"
                      as={TextField}
                      variant="outlined"
                      label="Name"
                      error={Boolean(errors.name)}
                      helperText={errors.name}
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
                      error={Boolean(errors.number)}
                      helperText={errors.number}
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
                      error={Boolean(errors.county)}
                      helperText={errors.county}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleCountyChange(e);
                        handleChange(e);
                        setFieldValue("city", "");
                      }}
                    >
                      {countiesWCities.map((item) => (
                        <MenuItem key={item.id} value={`${item.county}`}>
                          {item.county}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="city"
                      as={TextField}
                      variant="outlined"
                      label="City name"
                      select
                      error={Boolean(errors.city)}
                      helperText={errors.city}
                    >
                      {filteredCounties[0].cities?.map((item) => (
                        <MenuItem key={item.id} value={`${item.city}`}>
                          {item.city}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="email"
                      as={TextField}
                      type="email"
                      variant="outlined"
                      label="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
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
          <Button
            onClick={(e) =>
              dispatch({
                type: "showAlert",
                payload: {
                  message: "Successfully updated info",
                  severity: "success",
                  time: 3500,
                },
              })
            }
          >
            Testas
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfileForm;
