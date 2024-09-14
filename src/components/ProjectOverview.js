import React from 'react';
import ProjectOverviewItem from './ProjectOverviewItem';
import Technologies from './Technologies';
import PreviewImage from './PreviewImage';
import DialogLink from './DialogLink';
import * as styles from './ProjectOverview.module.scss';
import sleepMode from '../images/sleep.svg';
import archivedCode from '../images/archived.svg';

const sleepModeMessage =
    'This project will need time to wake up from sleep mode. Are you sure you want to proceed?';

const archivedMessage =
    'This project has been archived. Are you sure you want to proceed?';

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
                <DialogLink
                    title="Source URL"
                    url={project.sourceUrl}
                    useDialog={project.archivedCode}
                    message={archivedMessage}
                    image={archivedCode}
                    dialogTitle="Archived Code"
                />
                <DialogLink
                    title="Demo URL"
                    url={project.demoUrl}
                    useDialog={project.sleepMode}
                    message={sleepModeMessage}
                    image={sleepMode}
                    dialogTitle="Sleep Mode"
                />
                <ProjectOverviewItem title="Stacks">
                    <Technologies list={project.technologies} />
                </ProjectOverviewItem>
            </ul>
        </section>
    );
};

export default ProjectOverview;
