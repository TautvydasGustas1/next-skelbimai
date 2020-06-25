import React from 'react';
import { Box, Card, CardContent, Grid, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

export interface RegisterInterface {
    name: string;
    price: number;
    description?: string;
    pictures?: File;
}

const initialValues: RegisterInterface = {
    name: '',
    price: 0,
    description: '',
    pictures: undefined,
};

const AdCreateForm = () => {
    return (
        <Box>
            <Card>
                <CardContent>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        {({ values }) => (
                            <Form>
                                <Grid container>
                                    <Grid xs={12} item>
                                        <Field
                                            autoComplete='false'
                                            name='name'
                                            label='Name of product'
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            name='price'
                                            label='Price'
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            name='description'
                                            label='Description'
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            name='images'
                                            label='Images'
                                            as={TextField}
                                        />
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
