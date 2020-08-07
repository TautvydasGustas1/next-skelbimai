import React from "react";
import { TextField, Grid, Button, MenuItem } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import { string, object } from "yup";
import { ICities } from "../../types/CitiesInterface";

const size = 20;

interface SearchByComputersProps {
  setDataState: any;
  setLoading: any;
  setLoadingPagination: any;
  subCategory: any;
  citiesState: ICities[];
}

const SearchByComputers = ({
  setDataState,
  setLoading,
  setLoadingPagination,
  subCategory,
  citiesState,
}: SearchByComputersProps) => {
  const initialValues = {
    cpu: "",
    gpu: "",
    memory: "",
    motherboard: "",
    ram: "",
    city: "Any",
    sub_category: subCategory,
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await Axios.post(`/api/computers/v1/search?size=${size}`, values)
      .then((res) => {
        console.log(res.data);
        setDataState(res.data);
        setLoading(false);
        setLoadingPagination(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      validationSchema={object({
        cpu: string().required(),
        gpu: string().required(),
        memory: string().required(),
        motherboard: string().required(),
        ram: string().required(),
        city: string().required(),
      })}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
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

export default SearchByComputers;
