import React from 'react';
import PaginateProjects from './PaginateProjects';
import { useStaticQuery, graphql } from 'gatsby';

const SearchResults = ({ category, query, page }) => {
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
									width: 20
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
	const filteredProjects = () => {
		const projects = allContentfulProject.nodes;
		if (category === 'all') {
			return projects.filter((project) => includesQueryTerm(project));
		} else {
			return allContentfulProject.nodes.filter((project) => {
				const categories = project.category.map((i) => i.slug);
				return (
					categories.includes(category) && includesQueryTerm(project)
				);
			});
		}
	};
	const includesQueryTerm = (project) => {
		const terms = query.split(/\s+/g);
		const regex = new RegExp(`(${terms.join('|')})`, 'gi');
		const nameMatch = project.name.match(regex);
		const summaryMatch = project.summary.match(regex);
		const techMatch = listIncludesQueryTerm(project.technologies, regex);
		return nameMatch || summaryMatch || techMatch;
	};
	const listIncludesQueryTerm = (list, regex) => {
		for (let i = 0; i < list.length; i++) {
			if (list[i].name.match(regex)) {
				return true;
			}
		}
		return false;
	};
	return (
		<PaginateProjects
			results={filteredProjects()}
			baseUrl={`/search/${category}/${query}`}
			query={query}
			page={page}
			title={`Search for "${query}" - Page ${page}`}
			description={`Page ${page} of search for term "${query}" in "${category}".`}
			category={category === 'all' ? '' : category}
		/>
	);
};

export default SearchResults;
