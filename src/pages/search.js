import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { graphql } from 'gatsby';

export const query = graphql`
	query {
		allContentfulProject {
			nodes {
				contentful_id
				slug
				name
				demoUrl
				previewImage {
					gatsbyImageData(
						width: 450
						placeholder: BLURRED
						formats: [AUTO, WEBP]
					)
				}
			}
		}
	}
`;
const Search = ({ params, data }) => {
	return (
		<Layout>
			<SearchBar />
			<h1>Search Page</h1>
			<p>query: {params['*']}</p>
		</Layout>
	);
};

export default Search;
