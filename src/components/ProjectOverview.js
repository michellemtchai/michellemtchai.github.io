import React from 'react';
import ExternalLink from './ExternalLink';
import ProjectOverviewItem from './ProjectOverviewItem';
import Technologies from './Technologies';
import PreviewImage from './PreviewImage';
import DemoLink from './DemoLink';
import * as styles from './ProjectOverview.module.scss';

const ProjectOverview = (project) => {
    return (
        <section className={styles.overview}>
            <PreviewImage
                src={project.previewImage}
                alt={project.name}
                demo={project.demoUrl}
                className={styles.previewImage}
            />
            <ul>
                <li>
                    <h2>{project.name}</h2>
                </li>
                <ProjectOverviewItem title="Summary">
                    {project.summary}
                </ProjectOverviewItem>
                <ProjectOverviewItem title="Source URL">
                    <ExternalLink
                        to={project.sourceUrl}
                        title="Source URL"
                        showExternalIcon={true}
                    >
                        {project.sourceUrl}
                    </ExternalLink>
                </ProjectOverviewItem>
                <DemoLink demoUrl={project.demoUrl} sleep={project.sleepMode} />
                <ProjectOverviewItem title="Stacks">
                    <Technologies list={project.technologies} />
                </ProjectOverviewItem>
            </ul>
        </section>
    );
};

export default ProjectOverview;
