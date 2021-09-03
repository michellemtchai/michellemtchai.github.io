import React from 'react';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulProject(slug: { eq: $slug }) {
            name
            summary
            sourceURL
            demoURL
            description
            technologies {
                name
                url
                icon {
                    url
                }
            }
        }
    }
`;
const Project = ({ data }) => {
    const project = data.contentfulProject;
    return (
        <Layout title={project.name} description={project.summary}>
            <h2>{project.name}</h2>
            <details>
                <ul>
                    <li>
                        <b>Summary: </b>
                        {project.summary}
                    </li>
                    <li>
                        <b>Source URL: </b>
                        {project.sourceURL}
                    </li>
                    {project.demoURL && (
                        <li>
                            <b>Source URL: </b>
                            {project.sourceURL}
                        </li>
                    )}
                </ul>
            </details>
            <section>{project.description}</section>
        </Layout>
    );
};

export default Project;
