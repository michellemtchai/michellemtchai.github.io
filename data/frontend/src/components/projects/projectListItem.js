import React from 'react';
import Image from '../image/image';
import { goToPage } from '../../shared/router';

class ProjectListItem extends React.Component {
    project = (event) => {
        event.preventDefault();
        let project = this.props.project;
        goToPage(`/projects/${project._id}`);
    };
    render() {
        let project = this.props.project;
        let alt = `Preview of ${project.name}`;
        let title = `See details about ${project.name}`;
        let demo = project.demo_url ? <span>Demo</span> : '';
        return (
            <li title={title} onClick={this.project}>
                <a
                    href={`/projects/${project._id}`}
                    onClick={this.project}
                >
                    <Image src={project.image_url} alt={alt} />
                    <article>
                        <h2>
                            {project.name} {demo}
                        </h2>
                        <p>{project.summary}</p>
                    </article>
                </a>
            </li>
        );
    }
}

export default ProjectListItem;
