import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Grid,
    makeStyles,
    Button,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    Card: {
        width: '100%',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export interface IProfile {
    name: string;
    phone: string;
    city: string;
    email: string;
}

const initialValues: IProfile = {
    name: '',
    phone: '',
    city: '',
    email: '',
};

const EditProfileForm = () => {
    const classes = useStyles();
    return (
        <Box>
            <Card className={classes.Card}>
                <Box textAlign='center' p={3}>
                    <Typography variant='h4'>Update profile</Typography>
                </Box>
                <CardContent>
                    <Formik initialValues={initialValues} onSubmit={() => {}}>
                        {({ values }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name='name'
                                            as={TextField}
                                            variant='outlined'
                                            label='Name'
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name='phone'
                                            type='tel'
                                            as={TextField}
                                            variant='outlined'
                                            label='Phone number'
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name='county'
                                            as={TextField}
                                            variant='outlined'
                                            label='County'
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name='city'
                                            as={TextField}
                                            variant='outlined'
                                            label='City name'
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name='email'
                                            as={TextField}
                                            type='email'
                                            variant='outlined'
                                            label='Email'
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box textAlign='center'>
                                            <Button
                                                color='primary'
                                                variant='outlined'
                                            >
                                                Update
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

export default EditProfileForm;
