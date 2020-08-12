import React from "react";
import { TextField, Grid, Button, MenuItem, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
import { SearchBy } from "../../types/SearchByInterfaceProps";

const SearchByMonitors = ({ citiesState, handleSearchSubmit }: SearchBy) => {
  const initialValues = {
    city: "any",
    brand: "",
    model: "",
    refresh_rate: "",
    resolution: "",
    response_time: "",
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
                id="brand"
                label="Brand"
                variant="outlined"
                name="brand"
                error={Boolean(errors.brand)}
                helperText={errors.brand}
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
                id="refresh_rate"
                label="Refresh rate"
                variant="outlined"
                name="refresh_rate"
                error={Boolean(errors.refresh_rate)}
                helperText={errors.refresh_rate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="resolution"
                label="Resolution"
                variant="outlined"
                name="resolution"
                error={Boolean(errors.resolution)}
                helperText={errors.resolution}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="response_time"
                label="Response time"
                variant="outlined"
                name="response_time"
                error={Boolean(errors.response_time)}
                helperText={errors.response_time}
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

export default SearchByMonitors;
