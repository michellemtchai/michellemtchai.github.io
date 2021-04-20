import './index.css';
import React from 'react';
import Image from '../../image/Image';
import TabLink from '../tabLink/TabLink';
import TechList from '../../techList/TechList';
import Tags from './tags/Tags';

class ProjectInfo extends React.Component {
    render() {
        let project = this.props.project;
        let className = project.demo_url ? 'demo' : '';
        let demo = project.demo_url ? (
            <span className="demo-tag">DEMO</span>
        ) : (
            ''
        );
        let technologies = this.props.state.technologies;
        let tech = project.technologies.map(
            (i) => technologies[i]
        );
        return (
            <section className="project-info">
                <Image
                    src={project.image_url}
                    alt={project.name}
                    width="250px"
                />
                {demo}
                <h2 className={className}>{project.name}</h2>
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
                            tech={tech}
                            clickable={true}
                        />
                    </li>
                    <Tags {...this.props} tags={project.tags} />
                </ul>
            </section>
        );
    }
}

export default ProjectInfo;
