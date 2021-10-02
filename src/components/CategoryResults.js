import React from 'react';
import PaginateProjects from './PaginateProjects';

const CategoryResults = ({ category, slug, page }) => {
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};

	return (
		<PaginateProjects
			results={filteredProjects()}
			baseUrl={`/${slug}`}
			page={page}
			title={`${category.name} - Page ${page}`}
			description={category.summary}
			category={slug}
		/>
	);
};

export default CategoryResults;
