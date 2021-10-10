import React, { useState } from 'react';
import PaginateProjects from './PaginateProjects';
import { getStacks, sortDirOptions } from '../shared/filter';

const CategoryResults = ({ category, slug, page }) => {
	const [sortBy, updateSortBy] = useState('name');
	const [sortDir, updateSortDir] = useState('ASC');
	const [stacks, updateStacks] = useState({});
	const [initialized, updateInitialized] = useState(false);
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};
	const projects = filteredProjects();
	const filters = {
		sortBy: {
			value: sortBy,
			update: updateSortBy,
			options: [
				{
					label: 'Project Name',
					value: 'name',
				},
			],
		},
		sortDir: {
			value: sortDir,
			update: updateSortDir,
			options: sortDirOptions,
		},
		stacks: {
			initialized: initialized,
			updateInitialized: updateInitialized,
			value: stacks,
			update: updateStacks,
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
