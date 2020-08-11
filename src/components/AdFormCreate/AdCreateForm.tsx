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
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { ICities } from "../../types/CitiesInterface";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export interface IAdCreateFormProps {
  initialValues: any;
  jwt?: String;
  handleBack?: () => void;
  citiesState: any;
  ValidationSchema: any;
  handleSubmit: any;
  title?: string;
  url: string;
}

const AdCreateForm = ({
  initialValues,
  jwt,
  handleBack,
  citiesState,
  ValidationSchema,
  handleSubmit,
  title,
  url,
}: IAdCreateFormProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.Card}>
        <CardContent>
          <Box p={3}>
            <Typography variant="h4" align="center">
              {!title ? "Create an ad" : title}
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={(values, formikHelpers) => {
              return new Promise((res) => {
                handleSubmit(values, res, url);
              });
            }}
          >
            {({ values, errors, isSubmitting }) => (
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
                        Main information
                      </Typography>
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="type"
                        label="Type"
                        as={TextField}
                        variant="outlined"
                        select
                        error={Boolean(errors.type)}
                        helperText={errors.type}
                      >
                        <MenuItem value="Perka">Buy</MenuItem>
                        <MenuItem value="Parduoda">Sell</MenuItem>
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
                        error={Boolean(errors.article)}
                        helperText={errors.article}
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
                        select
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                      >
                        {citiesState.map((item: ICities) => (
                          <MenuItem key={item.id} value={`${item.city}`}>
                            {item.city}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="price"
                        label="Price"
                        as={TextField}
                        type="number"
                        variant="outlined"
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        name="description"
                        label="Description"
                        as={TextField}
                        multiline
                        rows={5}
                        rowsMax={10}
                        variant="outlined"
                        error={Boolean(errors.description)}
                        helperText={errors.description}
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
                        Information about product
                      </Typography>
                    </Grid>
                    {initialValues.cpu !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="cpu"
                          label="CPU"
                          as={TextField}
                          variant="outlined"
                          error={Boolean(errors.cpu)}
                          helperText={errors.cpu}
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
                          error={Boolean(errors.gpu)}
                          helperText={errors.gpu}
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
                          error={Boolean(errors.motherboard)}
                          helperText={errors.motherboard}
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
                          error={Boolean(errors.ram)}
                          helperText={errors.ram}
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
                          error={Boolean(errors.memory)}
                          helperText={errors.memory}
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
                          error={Boolean(errors.screen_size)}
                          helperText={errors.screen_size}
                        />
                      </Grid>
                    )}
                    {initialValues.brand !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="brand"
                          label="Brand"
                          as={TextField}
                          variant="outlined"
                          type="text"
                          error={Boolean(errors.brand)}
                          helperText={errors.brand}
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
                    {initialValues.manufacturer !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="manufacturer"
                          label="Manufacturer"
                          as={TextField}
                          variant="outlined"
                          type="text"
                          error={Boolean(errors.manufacturer)}
                          helperText={errors.manufacturer}
                        />
                      </Grid>
                    )}
                    {initialValues.os !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="os"
                          label="Operating system"
                          as={TextField}
                          variant="outlined"
                          type="text"
                          error={Boolean(errors.os)}
                          helperText={errors.os}
                        />
                      </Grid>
                    )}
                    {initialValues.wireless !== undefined && (
                      <Grid xs={12} item>
                        <Field
                          fullWidth
                          autoComplete="off"
                          name="wireless"
                          label="Wireless"
                          as={TextField}
                          variant="outlined"
                          select
                          error={Boolean(errors.wireless)}
                          helperText={errors.wireless}
                        >
                          <MenuItem value="yes">Yes</MenuItem>
                          <MenuItem value="no">No</MenuItem>
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
                          error={Boolean(errors.model)}
                          helperText={errors.model}
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
                          error={Boolean(errors.camera)}
                          helperText={errors.camera}
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
                {handleBack && (
                  <Box mt={3} textAlign="center">
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="outlined"
                      onClick={() => handleBack()}
                    >
                      Back
                    </Button>
                  </Box>
                )}
                <Box mt={1} textAlign="center">
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
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
