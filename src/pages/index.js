import React from 'react';
import CategoryPreview from '../components/CategoryPreview';
import SearchBar from '../components/SearchBar';
import { graphql } from 'gatsby';

export const query = graphql`
	query {
		allContentfulCategory(sort: { fields: navBarIndex, order: ASC }) {
			nodes {
				contentful_id
				name
				slug
				projects {
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
	}
`;
const Home = ({ data }) => {
	return (
		<>
			<SearchBar />
			{data &&
				data.allContentfulCategory.nodes.map((category) => (
					<CategoryPreview
						key={category.contentful_id}
						title={category.name}
						slug={category.slug}
						projects={category.projects}
					/>
				))}
		</>
	);
};

export default Home;
