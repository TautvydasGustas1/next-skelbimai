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
import ImagesDropzone from "../ImagesDropzone";
import { IAd } from "../../types/PostsInterface";
import { string, object } from "yup";
import { Elektronika } from "../../Utils/FormFields";

const useStyles = makeStyles((theme) => ({
  Card: {
    width: "100%",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

// const initialValues: IAd = {
//   name: "",
//   price: 0,
//   description: "",
//   pictures: undefined,
//   bukle: "",
//   kategorija: "kompiuteriai",
// };

//const initialValues = new Elektronika("", 0);

const handleSubmit = (values: IAd) => {
  console.log(values);
};

const AdCreateForm = () => {
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
            validationSchema={object({
              name: string().required(),
            })}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              handleSubmit(values);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <Grid container spacing={3}>
                  {initialValues.name !== undefined && (
                    <Grid xs={12} item>
                      <Field
                        fullWidth
                        autoComplete="off"
                        name="name"
                        label="Name of product"
                        as={TextField}
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                      />
                    </Grid>
                  )}
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
                      fullWidth
                      name="state"
                      label="Buklė"
                      as={TextField}
                      type="text"
                      variant="outlined"
                      select
                    >
                      <MenuItem value="naudotas">Naudotas</MenuItem>
                      <MenuItem value="naujas">Naujas</MenuItem>
                    </Field>
                  </Grid>
                  <Grid xs={12} item>
                    <Field name="images" label="Images" as={ImagesDropzone} />
                  </Grid>
                  <Grid xs={12} item>
                    <Box textAlign="center">
                      <Button type="submit" color="primary" variant="outlined">
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdCreateForm;
