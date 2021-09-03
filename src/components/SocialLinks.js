import React from 'react';
import ExternalLink from './ExternalLink';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialLinks = () => {
    const { allContentfulSocialLink } = useStaticQuery(
        graphql`
            query {
                allContentfulSocialLink {
                    nodes {
                        name
                        url
                        icon
                    }
                }
            }
        `
    );
    return (
        <ul>
            {allContentfulSocialLink &&
                allContentfulSocialLink.nodes.map((node) => (
                    <li>
                        <ExternalLink to={node.url} title={node.name}>
                            <FontAwesomeIcon icon={node.icon.split(/\s+/)} />
                        </ExternalLink>
                    </li>
                ))}
        </ul>
    );
};

export default SocialLinks;
