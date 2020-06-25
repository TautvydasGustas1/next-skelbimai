import React from 'react';
import Layout from '../../components/Layout';
import { Container, Box } from '@material-ui/core';
import AdCreateForm from '../../components/AdCreateForm';

const create = () => {
    return (
        <Layout>
            <Container>
                <Box mt={3}>
                    <AdCreateForm />
                </Box>
            </Container>
        </Layout>
    );
};

export default create;
