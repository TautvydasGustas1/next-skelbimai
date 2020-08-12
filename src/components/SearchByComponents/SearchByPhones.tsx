import React from "react";
import { TextField, Grid, Button, MenuItem, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
import { SearchBy } from "../../types/SearchByInterfaceProps";

const SearchByPhones = ({ citiesState, handleSearchSubmit }: SearchBy) => {
  const initialValues = {
    camera: "",
    manufacturer: "",
    memory: "",
    model: "",
    os: "",
    ram: "",
    city: "any",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSearchSubmit(values)}
    >
      {({ values, errors }) => (
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="camera"
                label="Camera"
                variant="outlined"
                name="camera"
                error={Boolean(errors.camera)}
                helperText={errors.camera}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="manufacturer"
                label="Manufacturer"
                variant="outlined"
                name="manufacturer"
                error={Boolean(errors.manufacturer)}
                helperText={errors.manufacturer}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="memory"
                label="Memory"
                variant="outlined"
                name="memory"
                error={Boolean(errors.memory)}
                helperText={errors.memory}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="model"
                label="Model"
                variant="outlined"
                name="model"
                error={Boolean(errors.model)}
                helperText={errors.model}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="os"
                label="Os"
                variant="outlined"
                name="os"
                error={Boolean(errors.os)}
                helperText={errors.os}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="ram"
                label="Ram"
                variant="outlined"
                name="ram"
                error={Boolean(errors.ram)}
                helperText={errors.ram}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="city"
                label="City"
                variant="outlined"
                name="city"
                error={Boolean(errors.city)}
                helperText={errors.city}
                select
              >
                <MenuItem value="any">Any</MenuItem>
                {citiesState.map((city) => (
                  <MenuItem key={city.id} value={city.city}>
                    {city.city}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                type="submit"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SearchByPhones;
