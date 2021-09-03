import React from 'react';
import Seo from './Seo';
import Header from './Header';

const Layout = ({ children, title, description }) => {
    return (
        <main>
            <Seo pageTitle={title} pageDescription={description} lang="en" />
            <Header />
            <nav>Nav bar</nav>
            <article>{children}</article>
            <footer>Footer</footer>
        </main>
    );
};

export default Layout;
