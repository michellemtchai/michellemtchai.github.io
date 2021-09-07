import React from 'react';
import Layout from '../components/Layout';
import CategoryPreview from '../components/CategoryPreview';
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
						gatsbyImageData(width: 450)
					}
				}
			}
		}
	}
`;
const Home = ({ data }) => {
	return (
		<Layout>
			{data &&
				data.allContentfulCategory.nodes.map((category) => (
					<CategoryPreview
						key={category.contentful_id}
						title={category.name}
						slug={category.slug}
						projects={category.projects}
					/>
				))}
		</Layout>
	);
};

export default Home;
