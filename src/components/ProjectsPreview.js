import React from 'react';
import PreviewImage from '../components/PreviewImage';
import { Link } from 'gatsby';
import * as styles from './ProjectsPreview.module.scss';

const ProjectsPreview = ({ list }) => {
	const projects = list.sort((a, b) => a.name - b.name).slice(0, 4);
	return (
		<ul className={styles.preview}>
			{projects &&
				projects.map((project) => (
					<li key={project.contentful_id}>
						<Link to={`/projects/${project.slug}`}>
							<PreviewImage
								className={styles.previewImage}
								src={project.previewImage}
								demo={project.demoUrl}
								alt={project.name}
							/>
							<h3>{project.name}</h3>
						</Link>
					</li>
				))}
		</ul>
	);
};

export default ProjectsPreview;
