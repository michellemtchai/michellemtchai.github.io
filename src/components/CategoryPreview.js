import React from 'react';
import PreviewImage from '../components/PreviewImage';
import ProjectsPreview from '../components/ProjectsPreview';
import { Link } from 'gatsby';

const CategoryPreview = ({ title, slug, projects }) => {
	const categoryUrl = `/${slug}`;
	return (
		<section>
			<h2>
				<Link to={categoryUrl}>{title}</Link>
				<small>
					<Link to={categoryUrl}>View More</Link>
				</small>
			</h2>
			<ProjectsPreview list={projects} />
		</section>
	);
};

export default CategoryPreview;
