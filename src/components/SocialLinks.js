import React from 'react';
import ExternalLink from './ExternalLink';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import * as styles from './SocialLinks.module.scss';
library.add(fab);

const SocialLinks = () => {
    const { allContentfulSocialLink } = useStaticQuery(
        graphql`
            query {
                allContentfulSocialLink {
                    nodes {
                        contentful_id
                        name
                        url
                        icon
                    }
                }
            }
        `
    );
    return (
        <ul className={styles.links}>
            {allContentfulSocialLink &&
                allContentfulSocialLink.nodes.map((socialLink) => (
                    <li key={socialLink.contentful_id}>
                        <ExternalLink
                            to={socialLink.url}
                            title={socialLink.name}
                        >
                            <FontAwesomeIcon
                                icon={socialLink.icon.split(/\s+/)}
                            />
                        </ExternalLink>
                    </li>
                ))}
        </ul>
    );
};

export default SocialLinks;
