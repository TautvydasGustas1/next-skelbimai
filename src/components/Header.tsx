import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { drawerWidth } from "../Utils/GlobalVariales";
import { useAlert } from "../context/AlertContext";
import Cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  rightSideContainer: {
    marginLeft: "auto",
  },
  title: {
    marginRight: "5%",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const authRoutes = (
  <div>
    <Link href="/login">
      <Button color="inherit">Login</Button>
    </Link>
    <Link href="/register">
      <Button color="inherit">Register</Button>
    </Link>
  </div>
);

const Header = () => {
  const [state, dispatch] = useAuth();
  const [alertState, alertDispatch] = useAlert();

  const logoutHandler = () => {
    dispatch({ type: "logout" });
    Cookie.remove("auth");
    alertDispatch({
      type: "showAlert",
      payload: {
        message: "Successfully logged out!",
        severity: "success",
      },
    });
    Router.push("/login");
  };

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem component="a" href="/profile" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem component="a" href="/profile/edit" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Edit a profile"} />
        </ListItem>

        <Divider />
        <ListItem component="a" href="/" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Advertisement"} />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Laptops" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Personal computers" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Tablets" />
          </ListItem>
        </List>
        <ListItem component="a" href="/posts/create" button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Create an ad"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Link href="/">
            <Button color="inherit">Advertisements</Button>
          </Link>
          <div className={classes.rightSideContainer}>
            {!state.isAuthenticated ? (
              authRoutes
            ) : (
              <div>
                <Button onClick={(e) => logoutHandler()} color="inherit">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Header;
