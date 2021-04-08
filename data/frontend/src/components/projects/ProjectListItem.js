import React from 'react';
import Image from '../image/Image';
import { goToPage } from '../../shared/router';
import TechList from '../project/techList/TechList';

class ProjectListItem extends React.Component {
    project = (event) => {
        event.preventDefault();
        let project = this.props.project;
        goToPage(`/projects/${project._id}`);
    };
    render() {
        let project = this.props.project;
        let technologies = this.props.state.data.technologies;
        let alt = `Preview of ${project.name}`;
        let title = `See details about ${project.name}`;
        let demo = project.demo_url ? (
            <span className="demo-tag">DEMO</span>
        ) : (
            ''
        );
        return (
            <li title={title} onClick={this.project}>
                <a
                    href={`/projects/${project._id}`}
                    onClick={this.project}
                >
                    <Image
                        src={project.image_url}
                        alt={alt}
                        width="250px"
                    />
                    {demo}
                    <article>
                        <h2>{project.name}</h2>
                        <p>{project.summary}</p>
                        <TechList
                            {...this.props}
                            tech={project.technologies}
                            clickable={false}
                        />
                    </article>
                </a>
            </li>
        );
    }
}

export default ProjectListItem;
