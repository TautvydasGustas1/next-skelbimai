import React from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import EditProfileForm from '../../components/EditProfileForm';
import Layout from '../../components/Layout';

const useStyles = makeStyles((theme) => ({
    Card: {
        width: '100%',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

const create = () => {
    const classes = useStyles();
    return (
        <Layout>
            <Container>
                <Box pt={3}>
                    <EditProfileForm />
                </Box>
            </Container>
        </Layout>
    );
};

export default create;
