import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { GetServerSideProps } from 'next';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    rightSideContainer: {
        marginLeft: 'auto',
    },
    title: {
        marginRight: '5%',
    },
}));

const authRoutes = (
    <div>
        <Link href='/login'>
            <Button color='inherit'>Login</Button>
        </Link>
        <Link href='/register'>
            <Button color='inherit'>Register</Button>
        </Link>
    </div>
);

export interface HeaderProps {
    isAuth?: Boolean;
    logout?: any;
}

const Header = (isAuth = true, logout: any) => {
    const classes = useStyles();
    return (
        <header>
            <nav>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='menu'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            News
                        </Typography>
                        <Link href='/'>
                            <Button color='inherit'>Advertisements</Button>
                        </Link>
                        <div className={classes.rightSideContainer}>
                            {!isAuth ? (
                                authRoutes
                            ) : (
                                <div>
                                    <Button onClick={logout} color='inherit'>
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            </nav>
        </header>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const [state, dispatch] = useAuth();
    const isAuth = state.isAuthenticated;
    const logout = dispatch({ type: 'logout' });
    return { props: { isAuth } };
};

export default Header;
