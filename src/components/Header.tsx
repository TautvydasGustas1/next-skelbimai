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

const Header = () => {
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
                            <Link href='/login'>
                                <Button color='inherit'>Login</Button>
                            </Link>
                            <Link href='/register'>
                                <Button color='inherit'>Register</Button>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </nav>
        </header>
    );
};

export default Header;
