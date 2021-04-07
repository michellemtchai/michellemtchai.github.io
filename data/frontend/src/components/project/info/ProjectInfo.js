import './index.css';
import React from 'react';
import { api } from '../../../config/api';
import { editItem, deleteItem } from '../../../shared/pages';
import Image from '../../image/Image';
import Demo from '../demo/Demo';
import TabLink from '../tablink/TabLink';
import TechList from '../techList/TechList';
import Button from '../../form/buttons/Button';
import Tags from './tags/Tags';

class ProjectInfo extends React.Component {
    editProject = () => {
        editItem(this.props, '/projects', 'project');
    };
    deleteProject = () => {
        deleteItem(
            this.props,
            'project',
            api.removeProjectById,
            '/'
        );
    };
    render() {
        let project = this.props.project;
        return (
            <section className="project-info">
                <Image
                    src={project.image_url}
                    alt={project.name}
                />
                <h2>
                    {project.name}
                    <Demo url={project.demo_url} />
                </h2>
                <Button
                    text="Edit Project"
                    click={this.editProject}
                />
                <Button
                    text="Delete Project"
                    click={this.deleteProject}
                    type="danger"
                />
                <p>
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
                    <li>
                        <b>Stacks:</b>
                        <TechList
                            {...this.props}
                            tech={project.technologies}
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
