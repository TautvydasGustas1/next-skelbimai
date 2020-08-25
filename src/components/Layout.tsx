import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
  },
}));

const Layout = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) => {
  const classes = useStyles();

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
      )}
      <Header />
      <div className={classes.content}>
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
