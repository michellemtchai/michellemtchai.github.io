import React from 'react';
import SocialLinks from './SocialLinks';
import Button from './Button';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './Header.module.scss';
import Image from './Image';
library.add(fas);

const Header = ({ minimized, updateMinimized }) => {
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
    const updateNavState = () => {
        updateMinimized(!minimized);
    };
    const { title } = site.siteMetadata;
    return (
        <header className={styles.header}>
            <h1>
                <Button className={styles.navButton} onClick={updateNavState}>
                    <FontAwesomeIcon icon={['fas', 'bars']} />
                </Button>
                <Link to="/">{title}</Link>
            </h1>
            <section>
                <span>Find Me</span>
                <SocialLinks />
            </section>
        </header>
    );
};

export default Header;
