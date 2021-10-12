import React, { useEffect, useContext } from 'react';
import PaginateProjects from './PaginateProjects';
import { getStacks, sortDirOptions } from '../shared/filter';
import { GlobalContext } from '../../GlobalContext.js';

const CategoryResults = ({ category, slug, page }) => {
	const {
		categoryFiltersInitialized,
		setCategoryFiltersRange,
		categoryFiltersSortBy,
		setCategoryFiltersSortBy,
		categoryFiltersSortDir,
		setCategoryFiltersSortDir,
		categoryFiltersStacks,
		setCategoryFiltersStacks,
		categoryFiltersStackOptions,
		setCategoryFiltersStackOptions,
	} = useContext(GlobalContext);
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};
	const projects = filteredProjects();
	const filters = {
		sortBy: {
			value: categoryFiltersSortBy,
			update: setCategoryFiltersSortBy,
			options: [
				{
					label: 'Project Name',
					value: 'name',
				},
			],
		},
		sortDir: {
			value: categoryFiltersSortDir,
			update: setCategoryFiltersSortDir,
			options: sortDirOptions,
		},
		stacks: {
			initialized: categoryFiltersInitialized,
			updateInitialized: () => setCategoryFiltersRange(slug),
			value: categoryFiltersStacks,
			update: setCategoryFiltersStacks,
			options: categoryFiltersInitialized
				? categoryFiltersStackOptions
				: getStacks(projects),
		},
	};
	useEffect(() => {
		setCategoryFiltersStackOptions(filters.stacks.options);
	}, []);
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
