import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import NotFound from './404';
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
	const pageParams = params['*'];
	if (pageParams) {
		const result = pageParams.match(/^page\/(\d+)$/);
		if (result && result.length === 2) {
			const page = result[1];
			return (
				<Layout>
					<SearchBar />
					<h1>Search Page</h1>
					<p>category: {params.category}</p>
					<p>query: {params.query}</p>
					<p>page: {page}</p>
				</Layout>
			);
		} else {
			return <NotFound />;
		}
	} else {
		return (
			<Layout>
				<SearchBar />
				<h1>Search Page</h1>
				<p>category: {params.category}</p>
				<p>query: {params.query}</p>
			</Layout>
		);
	}
};

export default Search;
