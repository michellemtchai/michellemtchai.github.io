import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const ExternalLink = ({ to, title, children, showExternalIcon = false }) => {
    return (
        <a href={to} target="_blank" rel="noopener noreferrer" title={title}>
            {children}
            {showExternalIcon && (
                <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
            )}
        </a>
    );
};

export default ExternalLink;
