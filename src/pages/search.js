import React, { useEffect } from 'react';
import Results from '../components/Results';
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
const Search = ({ scrollToTop, params, data }) => {
	const categories = data.allContentfulCategory.nodes.map((i) => i.slug);
	const query = decodeURI(params.query);
	useEffect(() => {
		scrollToTop();
	}, []);
	if (['all', ...categories].includes(params.category)) {
		const pageParams = params['*'];
		return (
			<Results
				params={pageParams}
				Component={({ page }) => (
					<SearchResults
						category={params.category}
						query={query}
						page={page}
					/>
				)}
			/>
		);
	} else {
		return <NotFound />;
	}
};

export default Search;
