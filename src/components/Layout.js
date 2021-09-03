import React from 'react';
import Seo from './Seo';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
    return (
        <main>
            <Seo pageTitle={title} pageDescription={description} lang="en" />
            <Header />
            <NavBar />
            <article>{children}</article>
            <Footer />
        </main>
    );
};

export default Layout;
