import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulCategory(slug: { eq: $slug }) {
            name
            summary
        }
    }
`;
const Category = ({ data }) => {
    const category = data.contentfulCategory;
    return (
        <Layout title={category.name} description={category.summary}>
            <h1>{category.name}</h1>
        </Layout>
    );
};

export default Category;
