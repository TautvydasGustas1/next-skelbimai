import React from "react";
import { TextField, Grid, Button, MenuItem, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { string, object } from "yup";
import { SearchBy } from "../../types/SearchByInterfaceProps";

const SearchByExternal = ({ citiesState, handleSearchSubmit }: SearchBy) => {
  const initialValues = {
    brand: "",
    city: "Any",
    wireless: "",
  };

  return (
    <Formik
      validationSchema={object({
        brand: string().required(),
        wireless: string().required(),
        city: string().required(),
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
                id="wireless"
                label="Wireless"
                variant="outlined"
                name="wireless"
                error={Boolean(errors.wireless)}
                helperText={errors.wireless}
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

export default SearchByExternal;
