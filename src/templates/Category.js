import React from 'react';
import Layout from '../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulCategory(slug: { eq: $slug }) {
            name
            summary
            projects {
                name
                summary
                previewImage {
                    file {
                        url
                    }
                }
                technologies {
                    name
                    icon {
                        file {
                            url
                        }
                    }
                }
            }
        }
    }
`;
const Category = ({ data }) => {
    const category = data.contentfulCategory;
    return (
        <Layout title={category.name} description={category.summary}>
            <h2>{category.name}</h2>
            {category.projects.map((project) => (
                <section>
                    <GatsbyImage
                        image={getImage(project.previewImage.file.url)}
                        alt={project.name}
                    />
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    <ul>
                        {project.technologies.map((tech) => (
                            <li>
                                <GatsbyImage
                                    image={getImage(tech.icon.file.url)}
                                    alt={tech.name}
                                />
                                {tech.name}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </Layout>
    );
};

export default Category;
