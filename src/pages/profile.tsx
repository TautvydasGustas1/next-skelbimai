import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NextPageContext } from 'next';
import {
    Box,
    Container,
    CardContent,
    Card,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import Layout from '../components/Layout';
import Alert from '@material-ui/lab/Alert';
import { IUserInfo } from '../types/UserInfoInterface';
import Link from 'next/link';
import TokenService from '../Helpers/TokenHelper';

export interface IProfileProps {
    jwt: string;
}

const Profile = ({ jwt }: IProfileProps) => {
    const [userInfoState, setUserInfoState] = useState<IUserInfo>({
        name: '',
        city: '',
        county: '',
        email: '',
        phone: '',
    });

    const [profileUpdated, setProfileUpdated] = useState(false);

    const alert = (
        <Box mb={1}>
            <Alert
                severity='info'
                action={
                    <Link href='/profile/edit'>
                        <Button color='inherit' size='small'>
                            Update profile
                        </Button>
                    </Link>
                }
            >
                Setup profile for faster ads creation!
            </Alert>
        </Box>
    );

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${jwt}` },
            validateStatus: () => true,
        };

        axios
            .get('/api/users/information/v1', config)
            .then((res) => {
                if (res.status === 200) {
                    const obj: IUserInfo = {
                        name: res.data.name,
                        city: res.data.city,
                        county: res.data.county,
                        email: res.data.email,
                        phone: res.data.phone,
                    };

                    setUserInfoState(obj);
                    setProfileUpdated(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Layout>
            <Container>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Typography variant='h3' align='center'>
                                Profile
                            </Typography>

                            <Box mt={3}>
                                <Box mb={1}>
                                    <Typography variant='h4' align='center'>
                                        Personal Information
                                    </Typography>
                                </Box>
                                {!profileUpdated && alert}
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'>
                                            <b>Name:</b> {userInfoState.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'>
                                            <b>Phone number:</b>{' '}
                                            {userInfoState.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'>
                                            <b>County:</b>{' '}
                                            {userInfoState.county}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'>
                                            <b>City:</b> {userInfoState.city}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant='body1'>
                                            <b>Email:</b> {userInfoState.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href='/profile/edit'>
                                            <Button
                                                variant='outlined'
                                                color={'inherit'}
                                            >
                                                Update profile
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Layout>
    );
};

Profile.getInitialProps = async (ctx: NextPageContext) => {
    const tokenService = new TokenService();
    const token = await tokenService.authenticateTokenSsr(ctx);

    return {
        jwt: token,
    };
};

export default Profile;
