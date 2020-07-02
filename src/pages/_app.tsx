import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import axios, { AxiosRequestConfig } from 'axios';
import { SWRConfig } from 'swr';
import 'react-dropzone-uploader/dist/styles.css';
import { NextPageContext, GetServerSideProps } from 'next';

axios.defaults.baseURL =
    'http://totau-rest-api.us-east-1.elasticbeanstalk.com/';

const fetcher = (url: AxiosRequestConfig) => axios(url).then((r) => r.data);

export default function MyApp(props: any) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
        console.log(props.re);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width'
                />
            </Head>
            <ThemeProvider theme={theme}>
                <SWRConfig
                    value={{
                        fetcher,
                    }}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </SWRConfig>
            </ThemeProvider>
        </React.Fragment>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log('reee');
    return {
        props: {
            re: 'asdasd',
        },
    };
};

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
