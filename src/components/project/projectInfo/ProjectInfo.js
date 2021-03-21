import './index.css';
import React from 'react';
import Image from '../../image/Image';
import TabLink from '../tabLink/TabLink';
import TechList from '../../techList/TechList';
import Demo from '../demo/Demo';

class ProjectInfo extends React.Component {
    render() {
        let project = this.props.project;
        let className = project.demo_url ? 'demo-p' : '';
        return (
            <section className="project-info">
                <Image
                    src={project.image_url}
                    alt={project.name}
                />
                <h2>
                    {project.name}{' '}
                    <Demo url={project.demo_url} />
                </h2>
                <p className={className}>
                    <b>Summary: </b>
                    {project.summary}
                </p>
                <ul>
                    <li>
                        <b>Source: </b>
                        <TabLink link={project.source_url} />
                    </li>
                    {project.demo_url ? (
                        <li>
                            <b>Demo: </b>
                            <TabLink link={project.demo_url} />
                        </li>
                    ) : (
                        ''
                    )}
                    <li className="tech-list">
                        <b>Stacks:</b>
                        <TechList
                            {...this.props}
                            tech={project.technologies}
                            clickable={true}
                        />
                    </li>
                </ul>
            </section>
        );
    }
}

export default ProjectInfo;
