import React from 'react';
import Layout from '../components/Layout';
import Projects from '../components/Projects';
import { graphql } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulCategory(slug: { eq: $slug }) {
            name
            summary
            projects {
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
            }
        }
    }
`;
const Category = ({ data, pageContext }) => {
    const category = data.contentfulCategory;
    return (
        <Layout
            title={category.name}
            description={category.summary}
            category={pageContext.slug}
        >
            <h2>{category.name}</h2>
            <Projects list={category.projects} />
        </Layout>
    );
};

export default Category;
