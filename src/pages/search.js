import React from 'react';
import SearchResults from '../components/SearchResults';
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
					<SearchResults
						category={params.category}
						query={query}
						page={page}
					/>
				);
			} else {
				return <NotFound />;
			}
		} else {
			return (
				<SearchResults
					category={params.category}
					query={query}
					page={1}
				/>
			);
		}
	} else {
		return <NotFound />;
	}
};

export default Search;
