import React from 'react';
import ExternalLink from './ExternalLink';
import ProjectOverviewItem from './ProjectOverviewItem';

const DemoLink = ({ demoUrl, sleep }) => {
    console.log('sleep', sleep);
    return (
        demoUrl && (
            <ProjectOverviewItem title="Demo URL">
                <ExternalLink
                    to={demoUrl}
                    title="Demo URL"
                    showExternalIcon={true}
                >
                    {demoUrl}
                </ExternalLink>
            </ProjectOverviewItem>
        )
    );
};

export default DemoLink;
