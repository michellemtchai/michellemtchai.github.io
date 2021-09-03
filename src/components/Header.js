import React from 'react';
import SocialLinks from './SocialLinks';
import { useStaticQuery, graphql } from 'gatsby';

const Header = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    const { title } = site.siteMetadata;
    return (
        <header>
            <h1>{title}</h1>
            <section>
                <span>Find Me</span>
                <SocialLinks />
            </section>
        </header>
    );
};

export default Header;
