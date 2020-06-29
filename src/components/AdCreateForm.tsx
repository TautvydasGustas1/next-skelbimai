import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid,
    TextField,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import ImagesDropzone from './ImagesDropzone';

const useStyles = makeStyles((theme) => ({
    Card: {
        width: '100%',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

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
    const classes = useStyles();
    return (
        <Box>
            <Card className={classes.Card}>
                <CardContent>
                    <Box p={3}>
                        <Typography variant='h4' align='center'>
                            Create an ad
                        </Typography>
                    </Box>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        {({ values }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid xs={12} item>
                                        <Field
                                            fullWidth
                                            autoComplete='off'
                                            name='name'
                                            label='Name of product'
                                            as={TextField}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            fullWidth
                                            name='price'
                                            label='Price'
                                            as={TextField}
                                            type='number'
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            fullWidth
                                            name='description'
                                            label='Description'
                                            as={TextField}
                                            multiline
                                            rows={3}
                                            rowsMax={10}
                                            variant='outlined'
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Field
                                            name='images'
                                            label='Images'
                                            as={ImagesDropzone}
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Box textAlign='center'>
                                            <Button
                                                color='primary'
                                                variant='outlined'
                                            >
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
