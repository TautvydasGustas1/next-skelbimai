import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../Utils/GlobalVariales";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
  },
}));

const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.content}>
        <main>{children}</main>
      </div>
      <footer>
        © {new Date().getFullYear()}
        {` `}
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
