import React, { useEffect, useContext } from 'react';
import PaginateProjects from './PaginateProjects';
import { useStaticQuery, graphql } from 'gatsby';
import {
	filterByStacks,
	getStacks,
	sortDirOptions,
	sortProjects,
} from '../shared/filter';
import { GlobalContext } from '../../GlobalContext.js';
import { rehype } from 'rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeReact from 'rehype-react';

const SearchResults = ({ category, query, page }) => {
	const {
		searchFiltersTerm,
		setSearchFiltersTerm,
		searchFiltersRange,
		setSearchFiltersRange,
		searchFiltersSortBy,
		setSearchFiltersSortBy,
		searchFiltersSortDir,
		setSearchFiltersSortDir,
		searchFiltersStacks,
		setSearchFiltersStacks,
		searchFiltersStackOptions,
		setSearchFiltersStackOptions,
	} = useContext(GlobalContext);
	const { allContentfulProject } = useStaticQuery(
		graphql`
			query {
				allContentfulProject {
					nodes {
						contentful_id
						slug
						name
						summary
						demoUrl
						previewImage {
							gatsbyImageData(
								width: 320
								placeholder: BLURRED
								formats: [AUTO, WEBP]
							)
						}
						technologies {
							contentful_id
							name
							icon {
								gatsbyImageData(
									width: 12
									placeholder: BLURRED
									formats: [AUTO, WEBP]
								)
							}
						}
						category {
							slug
						}
					}
				}
			}
		`
	);
	const boldQuery = (str) => {
		const terms = query.split(/\s+/g);
		const regex = new RegExp(`(${terms.join('|')})`, 'gi');
		const replacer = (x) => `<b>${x}</b>`;
		const replaced = str.replace(regex, replacer);
		const processed = rehype()
			.data('settings', { fragment: true })
			.use(rehypeSanitize, defaultSchema)
			.use(rehypeReact, {
				createElement: React.createElement,
			})
			.processSync(`<i>${replaced}<i>`);
		return <>{processed.result.props.children}</>;
	};
	const formatProject = (project) => {
		const result = { ...project };
		result.name = boldQuery(result.name);
		result.summary = boldQuery(result.summary);
		result.technologies.sort((a, b) => a.name.localeCompare(b.name));
		result.technologies = result.technologies.map((tech) => {
			return {
				...tech,
				label: boldQuery(tech.name),
			};
		});
		return result;
	};
	const filteredProjects = () => {
		const projects = allContentfulProject.nodes;
		let filtered = [];
		if (category === 'all') {
			projects.forEach((project) => {
				const relevance = getRelevance(project);
				if (relevance > 0) {
					filtered.push({
						...formatProject(project),
						relevance: relevance,
					});
				}
			});
		} else {
			allContentfulProject.nodes.forEach((project) => {
				const categories = project.category.map((i) => i.slug);
				const relevance = getRelevance(project);
				if (categories.includes(category) && relevance > 0) {
					filtered.push({
						...formatProject(project),
						relevance: relevance,
					});
				}
			});
		}
		filtered = filterByStacks(
			filtered,
			searchFiltersStacks,
			searchFiltersTerm === query
		);
		return sortProjects(
			filtered,
			searchFiltersSortDir,
			searchFiltersSortBy
		);
	};
	const getMatch = (term, regex) => {
		const match = term.match(regex);
		return match ? match.length : 0;
	};
	const getRelevance = (project) => {
		const terms = query.split(/\s+/g);
		const regex = new RegExp(`(${terms.join('|')})`, 'gi');
		let relevance = 0;
		relevance += getMatch(project.name, regex);
		relevance += getMatch(project.summary, regex);
		relevance += listIncludesQueryTerm(project.technologies, regex);
		return relevance;
	};
	const listIncludesQueryTerm = (list, regex) => {
		let count = 0;
		for (let i = 0; i < list.length; i++) {
			const match = getMatch(list[i].name, regex);
			if (match > 0) {
				count += match;
			}
		}
		return count;
	};
	const projects = filteredProjects();
	const filters = {
		sortBy: {
			value: searchFiltersSortBy,
			update: setSearchFiltersSortBy,
			options: [
				{
					label: 'Relevance',
					value: 'relevance',
				},
				{
					label: 'Project Name',
					value: 'name',
				},
			],
		},
		sortDir: {
			value: searchFiltersSortDir,
			update: setSearchFiltersSortDir,
			options: sortDirOptions,
		},
		stacks: {
			initialized:
				searchFiltersTerm === query && searchFiltersRange === category,
			updateInitialized: () => {
				setSearchFiltersRange(category);
				setSearchFiltersTerm(query);
			},
			value: searchFiltersStacks,
			update: setSearchFiltersStacks,
			options:
				searchFiltersTerm === query
					? searchFiltersStackOptions
					: getStacks(projects),
		},
	};
	useEffect(() => {
		setSearchFiltersStackOptions(filters.stacks.options);
	}, []);
	return (
		<PaginateProjects
			results={filteredProjects()}
			baseUrl={`/search/${category}/${query}`}
			query={query}
			page={page}
			heading="Search"
			title={`Search for "${query}" - Page ${page}`}
			description={`Page ${page} of search for term "${query}" in "${category}".`}
			category={category === 'all' ? '' : category}
			filters={filters}
		/>
	);
};

export default SearchResults;
