import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
  MenuItem,
  Input,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import ImagesDropzone from "../ImagesDropzone";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export interface IAdCreateFormProps {
  initialValues: any;
  jwt: String;
}

const AdCreateForm = ({ initialValues, jwt }: IAdCreateFormProps) => {
  {
    console.log(initialValues);
  }

  const handleUploadImages = (values) => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    console.log(values);

    axios
      .post("/api/file/v1/upload", values, config)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        console.log(errors.message);
      });
  };

  const handleSubmit = async (values: any, resolve: () => void) => {
    console.log(values);
    handleUploadImages(values);
    resolve();
    // const config = {
    //   headers: { Authorization: `Bearer ${jwt}` },
    // };
    // await axios
    //   .post("/api/computers/v1", values, config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((errors) => {
    //     console.log(errors.message);
    //   })
    //   .finally(() => {
    //     resolve();
    //   });
  };

  const handleSubmitImages = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
    //allFiles.forEach((f: any) => f.remove());
  };

  const classes = useStyles();
  return (
    <Box>
      <Card className={classes.Card}>
        <CardContent>
          <Box p={3}>
            <Typography variant="h4" align="center">
              Create an ad
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              return new Promise((res) => {
                handleSubmit(values, res);
              });
            }}
          >
            {({ values, errors }) => (
              <Form>
                <Grid spacing={3} container>
                  <Grid
                    alignContent="flex-start"
                    spacing={2}
                    container
                    item
                    xs={12}
                    lg={6}
                  >
                    <Grid xs={12} item>
                      <Typography align="center" variant="h6">
                        Mandatory fields
                      </Typography>
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="type"
                        label="Tipas"
                        as={TextField}
                        variant="outlined"
                        select
                      >
                        <MenuItem value="Perka">Perka</MenuItem>
                        <MenuItem value="Parduoda">Parduoda</MenuItem>
                      </Field>
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        autoComplete="off"
                        name="article"
                        label="Name of product"
                        as={TextField}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        autoComplete="off"
                        name="city"
                        label="City"
                        as={TextField}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="price"
                        label="Price"
                        as={TextField}
                        type="number"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="description"
                        label="Description"
                        as={TextField}
                        multiline
                        rows={3}
                        rowsMax={10}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        name="images"
                        type="file"
                        multiple
                        label="Images"
                        as={Input}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    spacing={2}
                    alignContent="flex-start"
                    container
                    item
                    xs={12}
                    lg={6}
                  >
                    <Grid xs={12} item>
                      <Typography align="center" variant="h6">
                        Optional fields
                      </Typography>
                    </Grid>
                    {initialValues.operating !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="operating"
                          label="Operating System"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.cpu !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="cpu"
                          label="CPU"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.gpu !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="gpu"
                          label="Video Card"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.motherboard !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="mothearboard"
                          label="Motherboard"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.ram !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="ram"
                          label="Rams"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.memory !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="memory"
                          label="Memory"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.aditional_memory !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="additional_memory"
                          label="Additional memory"
                          as={TextField}
                          variant="outlined"
                        />
                      </Grid>
                    )}
                    {initialValues.screen_size !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="screen_size"
                          label="Screen size"
                          as={TextField}
                          variant="outlined"
                          type="number"
                        />
                      </Grid>
                    )}
                    {initialValues.motherboard !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="motherboard"
                          label="Motherboard"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.power_supply !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="power_supply"
                          label="Power supply"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.color !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="color"
                          label="Color"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.wirelless !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="wirelless"
                          label="Wirelless"
                          as={TextField}
                          variant="outlined"
                          select
                        >
                          <MenuItem value="taip">Yes</MenuItem>
                          <MenuItem value="ne">No</MenuItem>
                        </Field>
                      </Grid>
                    )}
                    {initialValues.screen_rezoliution !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="screen_rezoliution"
                          label="Screen resoliution"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.model !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="model"
                          label="Model"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.camera !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="camera"
                          label="Camera"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.screen_type !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="screen_type"
                          label="Screen type"
                          as={TextField}
                          variant="outlined"
                          type="text"
                        />
                      </Grid>
                    )}
                    {initialValues.smart_tv !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="smart_tv"
                          label="SmartTV"
                          as={TextField}
                          variant="outlined"
                          select
                        >
                          <MenuItem value="true">Yes</MenuItem>
                          <MenuItem value="false">No</MenuItem>
                        </Field>
                      </Grid>
                    )}
                    {initialValues.threeD !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="threeD"
                          label="3D"
                          as={TextField}
                          variant="outlined"
                          select
                        >
                          <MenuItem value="true">Yes</MenuItem>
                          <MenuItem value="false">No</MenuItem>
                        </Field>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Box mt={3} textAlign="center">
                  <Button type="submit" color="primary" variant="outlined">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdCreateForm;
