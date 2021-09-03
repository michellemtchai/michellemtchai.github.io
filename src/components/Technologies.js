import React from 'react';
import ExternalLink from './ExternalLink';
import Image from './Image';

const Technologies = ({ list }) => {
    return (
        <ul>
            {list.map((tech) => (
                <li key={tech.contentful_id}>
                    <Image src={tech.icon} alt={tech.name} />
                    {tech.url ? (
                        <ExternalLink to={tech.url}>{tech.name}</ExternalLink>
                    ) : (
                        tech.name
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Technologies;
