import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

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

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <>
      <Header is_adminView={true} />
      <div className={classes.content}>
        <main>{children}</main>
      </div>
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
