import React from "react";
import { TextField, Grid, Button, MenuItem, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
import { SearchBy } from "../../types/SearchByInterfaceProps";

const SearchByMonitors = ({ citiesState, handleSearchSubmit }: SearchBy) => {
  const initialValues = {
    city: "Any",
    color: "",
    memory: "",
    model: "",
  };

  return (
    <Formik
      validationSchema={object({
        city: string().required(),
        color: string().required(),
        memory: string().required(),
        model: string().required(),
      })}
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
                id="color"
                label="Color"
                variant="outlined"
                name="color"
                error={Boolean(errors.color)}
                helperText={errors.color}
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
                id="city"
                label="City"
                variant="outlined"
                name="city"
                error={Boolean(errors.city)}
                helperText={errors.city}
                select
              >
                <MenuItem value="Any">Any</MenuItem>
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
