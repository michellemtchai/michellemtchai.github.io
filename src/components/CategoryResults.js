import React from 'react';
import PaginateProjects from './PaginateProjects';
import { getStacks } from '../shared/filter';

const CategoryResults = ({ category, slug, page }) => {
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};
	const projects = filteredProjects();
	const filters = {
		sortBy: {
			value: 'name',
			options: [
				{
					label: 'Project Name',
					value: 'name',
				},
			],
		},
		stacks: {
			value: 'all',
			options: getStacks(projects),
		},
	};
	return (
		<PaginateProjects
			results={projects}
			baseUrl={`/${slug}`}
			page={page}
			heading={category.name}
			title={`${category.name} - Page ${page}`}
			description={category.summary}
			category={slug}
			filters={filters}
		/>
	);
};

export default CategoryResults;
