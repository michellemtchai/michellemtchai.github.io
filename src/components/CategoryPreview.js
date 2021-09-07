import React from 'react';
import PreviewImage from '../components/PreviewImage';
import ProjectsPreview from '../components/ProjectsPreview';
import { Link } from 'gatsby';
import * as styles from './CategoryPreview.module.scss';

const CategoryPreview = ({ title, slug, projects }) => {
	const categoryUrl = `/${slug}`;
	return (
		<section className={styles.preview}>
			<h2>
				<Link className={styles.title} to={categoryUrl}>
					{title}
				</Link>
				<small>
					<Link to={categoryUrl}>View More</Link>
				</small>
			</h2>
			<ProjectsPreview list={projects} />
		</section>
	);
};

export default CategoryPreview;
