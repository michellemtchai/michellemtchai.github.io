import React from 'react';

const Layout = (props) => {
    return (
        <main>
            <nav>Nav bar</nav>
            <article>{props.children}</article>
            <footer>Footer</footer>
        </main>
    );
};

export default Layout;
