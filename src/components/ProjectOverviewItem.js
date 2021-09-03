import React from 'react';

const ProjectOverviewItem = ({ title, children }) => {
    return (
        <li>
            <b>{title}: </b>
            {children}
        </li>
    );
};

export default ProjectOverviewItem;
