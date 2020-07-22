import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../components/theme";
import axios, { AxiosRequestConfig } from "axios";
import { SWRConfig } from "swr";
import "react-dropzone-uploader/dist/styles.css";
import { AuthProvider } from "../context/AuthContext";
import AlertComp from "../components/AlertComp";
import { AlertProvider } from "../context/AlertContext";

axios.defaults.baseURL =
  "http://totau-rest-api.us-east-1.elasticbeanstalk.com/";

const fetcher = (url: AxiosRequestConfig) => axios(url).then((r) => r.data);

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
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
          <AuthProvider>
            <AlertProvider>
              <AlertComp />
              <Component {...pageProps} />
            </AlertProvider>
          </AuthProvider>
        </SWRConfig>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
