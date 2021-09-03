import React from 'react';
import Layout from '../components/Layout';
import ExternalLink from '../components/ExternalLink';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulProject(slug: { eq: $slug }) {
            altSlug
            name
            sleepMode
            summary
            sourceUrl
            demoUrl
            previewImage {
                file {
                    url
                }
            }
            description {
                description
            }
            technologies {
                name
                url
                icon {
                    file {
                        url
                    }
                }
            }
            gallery {
                file {
                    url
                }
                description
            }
        }
    }
`;
const Project = ({ data }) => {
    const project = data.contentfulProject;
    console.log('image', getImage(project.previewImage.file.url));
    return (
        <Layout title={project.name} description={project.summary}>
            <h2>{project.name}</h2>
            <Link to={`/projects/${project.altSlug}`}>Old Link</Link>
            <section>
                <GatsbyImage
                    image={getImage(project.previewImage.file.url)}
                    alt={project.name}
                />
                <ul>
                    <li>
                        <b>Summary: </b>
                        {project.summary}
                    </li>
                    <li>
                        <b>Source URL: </b>
                        <ExternalLink to={project.sourceUrl} title="Source URL">
                            {project.sourceUrl}
                        </ExternalLink>
                    </li>
                    {project.demoUrl && (
                        <li>
                            <b>Demo URL: </b>
                            <ExternalLink to={project.demoUrl} title="Demo URL">
                                {project.demoUrl}
                            </ExternalLink>
                        </li>
                    )}
                    <li>
                        <b>Stack: </b>
                        <ul>
                            {project.technologies.map((tech) => (
                                <li>
                                    <ExternalLink to={tech.url}>
                                        <GatsbyImage
                                            image={getImage(tech.icon.file.url)}
                                            alt={tech.name}
                                        />
                                        {tech.name}
                                    </ExternalLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </section>
            <section>{project.description.description}</section>
        </Layout>
    );
};

export default Project;
