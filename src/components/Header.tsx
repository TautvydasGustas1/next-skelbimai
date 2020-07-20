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

  const logoutHandler = () => {
    dispatch({ type: "logout" });
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
