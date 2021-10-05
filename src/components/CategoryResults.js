import React from 'react';
import PaginateProjects from './PaginateProjects';

const CategoryResults = ({ category, slug, page }) => {
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};
	const projects = filteredProjects();
	const getStacks = () => {
		let stackList = {};
		let stacks = [];
		projects.forEach((project) => {
			project.technologies.forEach((tech) => {
				if (!stackList[tech.name]) {
					stackList[tech.name] = tech.contentful_id;
				}
			});
		});
		Object.keys(stackList)
			.sort()
			.forEach((key) => {
				stacks.push({
					label: key,
					value: stackList[key],
				});
			});
		return stacks;
	};
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
			options: getStacks(),
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
