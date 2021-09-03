import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import NavBarItem from './NavBarItem';

const NavBar = () => {
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
    return (
        <nav>
            <ul>
                <NavBarItem to="/" name="Home" icon={['fas', 'home']} />
                {allContentfulCategory &&
                    allContentfulCategory.nodes.map((category) => (
                        <NavBarItem
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
