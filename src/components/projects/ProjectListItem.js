import React, { lazy } from 'react';
const TechList = lazy(() => import('../techList/TechList'));
import Image from '../image/Image';
import { goToPage } from '../../shared/router';
import { resetResults } from '../../shared/results';

class ProjectListItem extends React.Component {
    project = (event) => {
        event.preventDefault();
        let project = this.props.project;
        resetResults(this.props);
        goToPage(`/projects/${project._id}`);
    };
    render() {
        let project = this.props.project;
        let technologies = this.props.data.technologies;
        let tech = project.technologies.map(
            (j) => technologies[j]
        );
        let alt = `Preview of ${project.name}`;
        let title = `See details about ${project.name}`;
        let className = project.demo_url ? 'demo' : '';
        let demo = project.demo_url ? (
            <span className="demo-tag">DEMO</span>
        ) : (
            ''
        );
        return (
            <li
                className={'list-item ' + className}
                title={title}
                onClick={this.project}
            >
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
                    <section className={className}>
                        <section className="project-summary">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: project.name,
                                }}
                            ></h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: project.summary,
                                }}
                            ></p>
                        </section>
                        <TechList
                            {...this.props}
                            tech={tech}
                            clickable={false}
                        />
                    </section>
                </a>
            </li>
        );
    }
}

export default ProjectListItem;
