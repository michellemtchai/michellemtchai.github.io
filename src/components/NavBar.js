import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import NavBarItem from './NavBarItem';
import * as styles from './NavBar.module.scss';

const NavBar = ({ selected, minimized, update }) => {
    const [selectedNavItem, updateSelectedNavItem] = useState(selected);
    const handleClick = (slug, category) => () => {
        updateSelectedNavItem(slug);
        update(slug);
    };
    useEffect(() => {
        updateSelectedNavItem(selected);
    }, [selected]);
    const { allContentfulCategory } = useStaticQuery(
        graphql`
            query {
                allContentfulCategory(
                    sort: { fields: navBarIndex, order: ASC }
                ) {
                    nodes {
                        contentful_id
                        name
                        slug
                        icon
                    }
                }
            }
        `
    );
    const navState = minimized
        ? `${styles.navbar} ${styles.minimized}`
        : `${styles.navbar} ${styles.expanded}`;
    return (
        <nav className={navState}>
            <ul>
                <NavBarItem
                    selected={!selectedNavItem}
                    update={handleClick()}
                    to="/"
                    name="Home"
                    icon={['fas', 'home']}
                />
                {allContentfulCategory &&
                    allContentfulCategory.nodes.map((category) => (
                        <NavBarItem
                            selected={selectedNavItem === category.slug}
                            update={handleClick(category.slug, category)}
                            key={category.contentful_id}
                            to={`/${category.slug}`}
                            name={category.name}
                            icon={category.icon.split(/\s+/)}
                        />
                    ))}
            </ul>
        </nav>
    );
};

export default NavBar;
