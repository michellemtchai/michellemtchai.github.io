import React from 'react';
import Layout from './Layout';
import SearchBar from './SearchBar';
import Projects from './Projects';
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
		if (category === 'all') {
			return allContentfulProject.nodes;
		} else {
			return allContentfulProject.nodes.filter((project) => {
				const categories = project.category.map((i) => i.slug);
				return categories.includes(category);
			});
		}
	};
	return (
		<Layout>
			<SearchBar range={category} />
			<h1>Search Page</h1>
			<p>category: {category}</p>
			<p>query: {query}</p>
			<p>page: {page}</p>
			<Projects list={filteredProjects()} />
		</Layout>
	);
};

export default SearchResults;
