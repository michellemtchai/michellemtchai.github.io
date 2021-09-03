import React from 'react';
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
                        <a
                            href={node.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={node.name}
                        >
                            <FontAwesomeIcon icon={node.icon.split(/\s+/)} />
                        </a>
                    </li>
                ))}
        </ul>
    );
};

export default SocialLinks;
