import React, { useEffect } from 'react';
import Results from '../components/Results';
import CategoryResults from '../components/CategoryResults';
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
                        width: 600
                        placeholder: BLURRED
                        formats: [AUTO, WEBP]
                    )
                }
                technologies {
                    contentful_id
                    name
                    icon {
                        gatsbyImageData(
                            width: 12
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
    category.projects.forEach((project, i) => {
        project.technologies.sort((a, b) => a.name.localeCompare(b.name));
    });
    useEffect(() => {
        props.scrollToTop();
    }, []);

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
