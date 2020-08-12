import React from "react";
import { TextField, Grid, Button, MenuItem, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
import { SearchBy } from "../../types/SearchByInterfaceProps";

const SearchByComputers = ({ citiesState, handleSearchSubmit }: SearchBy) => {
  const initialValues = {
    cpu: "",
    gpu: "",
    memory: "",
    motherboard: "",
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
                id="cpu"
                label="CPU"
                variant="outlined"
                name="cpu"
                error={Boolean(errors.cpu)}
                helperText={errors.cpu}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                as={TextField}
                fullWidth
                id="gpu"
                label="GPU"
                variant="outlined"
                name="gpu"
                error={Boolean(errors.gpu)}
                helperText={errors.gpu}
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
                id="motherboard"
                label="Motherboard"
                variant="outlined"
                name="motherboard"
                error={Boolean(errors.motherboard)}
                helperText={errors.motherboard}
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

export default SearchByComputers;
