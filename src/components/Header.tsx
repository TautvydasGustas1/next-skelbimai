import React, { useState, useEffect } from "react";
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
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import { drawerWidth } from "../Utils/GlobalVariales";
import { useAlert } from "../context/AlertContext";
import Cookie from "js-cookie";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import ComputerIcon from "@material-ui/icons/Computer";
import StoreIcon from "@material-ui/icons/Store";
import AddIcon from "@material-ui/icons/Add";
import CategoryIcon from "@material-ui/icons/Category";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import TvIcon from "@material-ui/icons/Tv";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  rightSideContainer: {
    marginLeft: "auto",
  },
  title: {
    marginRight: "5%",
    cursor: "pointer",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  doubleNested: {
    paddingLeft: theme.spacing(8),
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

export interface HeaderProps {
  is_adminView?: Boolean;
}

const Header = ({ is_adminView }: HeaderProps) => {
  const [state, dispatch] = useAuth();
  const [alertState, alertDispatch] = useAlert();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setLoginState(true);
  }, []);

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

  const adminRender = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <Link href="/admin">
        <ListItem button>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary={"Delete Advertisements"} />
        </ListItem>
      </Link>
      <Link href="/admin/categories">
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={"Categories"} />
        </ListItem>
      </Link>
      <Divider />
    </>
  );

  const ProfileRoutes = (
    <>
      <Link href="/profile">
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
      </Link>
      <Link href="/profile/edit">
        <ListItem button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={"Edit a profile"} />
        </ListItem>
      </Link>
      <Link href="/posts/create">
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Create an ad"} />
        </ListItem>
      </Link>
      <Divider />
    </>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Box textAlign="center">
        <img alt="logo" src={"/photos/Logo.png"} width="120px" />
      </Box>
      <Divider />
      <List>
        {loginState && state.isAuthenticated && ProfileRoutes}
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary={"Advertisements"} />
          </ListItem>
        </Link>
        <List component="div" disablePadding>
          <Link href="/?category=Kompiuteriai">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Kompiuteriai" />
            </ListItem>
          </Link>
          <Link href="/?category=Telefonai">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PhoneAndroidIcon />
              </ListItemIcon>
              <ListItemText primary="Telefonai" />
            </ListItem>
          </Link>
          <Link href="/?category=Monitoriai">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <TvIcon />
              </ListItemIcon>
              <ListItemText primary="Monitoriai" />
            </ListItem>
          </Link>
          <Link href="/?category=Išoriniai įrenginiai">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DevicesOtherIcon />
              </ListItemIcon>
              <ListItemText primary="Išoriniai įrenginiai" />
            </ListItem>
          </Link>
          <Link href="/?category=Konsolės">
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Konsolės" />
            </ListItem>
          </Link>
        </List>
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
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              {is_adminView ? "Admin panel" : "Best ads"}
            </Typography>
          </Link>
          <div className={classes.rightSideContainer}>
            {loginState ? (
              !state.isAuthenticated ? (
                authRoutes
              ) : (
                <div>
                  <Button onClick={(e) => logoutHandler()} color="inherit">
                    Logout
                  </Button>
                </div>
              )
            ) : (
              ""
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
            {is_adminView ? adminRender : drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {is_adminView ? adminRender : drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Header;
