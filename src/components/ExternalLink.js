import React from 'react';

const ExternalLink = ({ to, title, children }) => {
    return (
        <a href={to} target="_blank" rel="noopener noreferrer" title={title}>
            {children}
        </a>
    );
};

export default ExternalLink;
