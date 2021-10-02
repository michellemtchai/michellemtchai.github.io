import React from 'react';
import Results from '../components/Results';
import CategoryResults from '../components/CategoryResults';
import NotFound from '../pages/404';
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
const Category = (props) => {
    const { data, pageContext } = props;
    const pageParams = props['*'];
    const category = data.contentfulCategory;
    return (
        <Results
            params={pageParams}
            Component={({ page }) => (
                <CategoryResults
                    category={category}
                    slug={pageContext.slug}
                    page={page}
                />
            )}
        />
    );
};

export default Category;
