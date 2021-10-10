import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import NavBarItem from './NavBarItem';
import { GlobalContext } from '../../GlobalContext.js';
import * as styles from './NavBar.module.scss';

const NavBar = ({ minimized }) => {
    const { selectedCategory, setSelectedCategory } = useContext(GlobalContext);

    const [selectedNavItem, updateSelectedNavItem] = useState(selectedCategory);
    const handleClick = (slug, category) => () => {
        updateSelectedNavItem(slug);
        setSelectedCategory(slug);
    };
    useEffect(() => {
        updateSelectedNavItem(selectedCategory);
    }, [selectedCategory]);
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
