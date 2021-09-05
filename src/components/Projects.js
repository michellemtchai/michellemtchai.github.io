import React from 'react';
import Image from './Image';
import Technologies from './Technologies';
import { Link } from 'gatsby';
import * as styles from './Projects.module.scss';

const Projects = ({ list }) => {
    return (
        <div className={styles.projects}>
            {list.map((project) => (
                <section key={project.contentful_id}>
                    <Link to={`/projects/${project.slug}`} alt={project.name}>
                        <Image
                            className={styles.previewImage}
                            src={project.previewImage}
                            alt={project.name}
                            userPlaceHolder={true}
                        />
                        <ul>
                            <li>
                                <h3>{project.name}</h3>
                            </li>
                            <li>
                                <p>{project.summary}</p>
                            </li>
                            <li>
                                <Technologies list={project.technologies} />
                            </li>
                        </ul>
                    </Link>
                </section>
            ))}
        </div>
    );
};

export default Projects;
