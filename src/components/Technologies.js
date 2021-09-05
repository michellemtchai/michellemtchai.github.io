import React from 'react';
import ExternalLink from './ExternalLink';
import Image from './Image';
import * as styles from './Technologies.module.scss';

const Technologies = ({ list }) => {
    return (
        <ul className={styles.node}>
            {list.map((tech) => (
                <li key={tech.contentful_id}>
                    {tech.url ? (
                        <ExternalLink to={tech.url}>
                            <Image src={tech.icon} alt={tech.name} />{' '}
                            {tech.name}
                        </ExternalLink>
                    ) : (
                        <span>
                            <Image src={tech.icon} alt={tech.name} />{' '}
                            {tech.name}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Technologies;
