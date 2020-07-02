import React from 'react';
import Layout from '../components/Layout';
import {
    Container,
    Box,
    Card,
    CardContent,
    TextField,
    Grid,
    Button,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import Link from 'next/link';
import { string, object, ref } from 'yup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    Card: {
        width: '100%',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    OuterSubmitContainer: {
        textAlign: 'center',
    },
}));

const handleSubmit = async (values: RegisterInterface, resolve: () => void) => {
    await axios
        .post('/api/users/v1/register', {
            username: values.username,
            password: values.password,
        })
        .then((res) => {
            console.log(res)
            
        })
        .catch((errors) => {
            console.log(errors.message);
        })
        .finally(() => {
            resolve();
        });
};

export interface RegisterInterface {
    username: string;
    password: string;
    password2: string;
}

const initialValues: RegisterInterface = {
    username: '',
    password: '',
    password2: '',
};

const register = () => {
    const classes = useStyles();
    return (
        <Layout>
            <Container>
                <Box pt={3}>
                    <Card className={classes.Card}>
                        <CardContent>
                            <Formik
                                validateOnChange={false}
                                validateOnBlur={false}
                                validationSchema={object({
                                    username: string().required(),
                                    password: string().required().min(6),
                                    password2: string()
                                        .required()
                                        .oneOf(
                                            [ref('password')],
                                            'Passwords do not match'
                                        )
                                        .min(6),
                                })}
                                initialValues={initialValues}
                                onSubmit={(values, formikHelpers) => {
                                    return new Promise((res) => {
                                        handleSubmit(values, res);
                                    });
                                }}
                            >
                                {({ values, errors, isSubmitting }) => (
                                    <Form>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} item>
                                                <Typography
                                                    align='center'
                                                    variant='h5'
                                                >
                                                    Register
                                                </Typography>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    label='Username'
                                                    name='username'
                                                    variant='outlined'
                                                    error={Boolean(
                                                        errors.username
                                                    )}
                                                    helperText={errors.username}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    label='Password'
                                                    name='password'
                                                    variant='outlined'
                                                    type={'password'}
                                                    error={Boolean(
                                                        errors.password
                                                    )}
                                                    helperText={errors.password}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    label='Repeat password'
                                                    name='password2'
                                                    variant='outlined'
                                                    type={'password'}
                                                    error={Boolean(
                                                        errors.password2
                                                    )}
                                                    helperText={
                                                        errors.password2
                                                    }
                                                />
                                            </Grid>
                                            <Grid
                                                xs={12}
                                                item
                                                style={{
                                                    paddingTop: 0,
                                                    paddingBottom: 0,
                                                }}
                                            >
                                                <Box textAlign='right'>
                                                    <Link href='/login'>
                                                        <Button
                                                            color='primary'
                                                            size='small'
                                                        >
                                                            Already Registered?
                                                        </Button>
                                                    </Link>
                                                </Box>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <div
                                                    className={
                                                        classes.OuterSubmitContainer
                                                    }
                                                >
                                                    <Button
                                                        color='primary'
                                                        variant='outlined'
                                                        type='submit'
                                                        disabled={isSubmitting}
                                                    >
                                                        Register
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Layout>
    );
};

export default register;
