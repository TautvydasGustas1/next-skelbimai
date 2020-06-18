import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
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
