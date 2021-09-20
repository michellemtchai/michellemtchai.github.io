import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import NotFound from './404';
import { graphql } from 'gatsby';

export const query = graphql`
	query {
		allContentfulCategory {
			nodes {
				slug
			}
		}
	}
`;
const Search = ({ params, data }) => {
	const categories = data.allContentfulCategory.nodes.map((i) => i.slug);
	const query = decodeURI(params.query);
	if (['all', ...categories].includes(params.category)) {
		const pageParams = params['*'];
		if (pageParams) {
			const result = pageParams.match(/^page\/(\d+)$/);
			if (result && result.length === 2) {
				const page = result[1];
				return (
					<Layout>
						<SearchBar range={params.category} />
						<h1>Search Page</h1>
						<p>category: {params.category}</p>
						<p>query: {query}</p>
						<p>page: {page}</p>
					</Layout>
				);
			} else {
				return <NotFound />;
			}
		} else {
			return (
				<Layout>
					<SearchBar range={params.category} />
					<h1>Search Page</h1>
					<p>category: {params.category}</p>
					<p>query: {query}</p>
				</Layout>
			);
		}
	} else {
		return <NotFound />;
	}
};

export default Search;
