import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import Axios from "axios";
import { string, object } from "yup";

const initialValues = {
  cpu: "",
  gpu: "",
  memory: "",
  motherboard: "",
  ram: "",
};
const SearchByComputers = ({ setDataState }: any) => {
  const handleSubmit = async (values: any) => {
    console.log(values);
    await Axios.get("/api/computers/v1/search", {
      params: values,
    })
      .then((res) => {
        console.log(res.data);
        setDataState(res.data);
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
