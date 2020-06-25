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

export interface RegisterInterface {
    email: string;
    password: string;
    password2: string;
}

const initialValues: RegisterInterface = {
    email: '',
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
                                initialValues={initialValues}
                                onSubmit={() => {}}
                            >
                                {({ values }) => (
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
                                                    label='Email'
                                                    name='email'
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    label='Password'
                                                    name='password'
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Field
                                                    fullWidth
                                                    as={TextField}
                                                    label='Repeat password'
                                                    name='password2'
                                                    variant='outlined'
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
