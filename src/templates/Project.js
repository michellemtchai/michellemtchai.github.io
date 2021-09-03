import React from 'react';
import Layout from '../components/Layout';
import ProjectOverview from '../components/ProjectOverview';
import Tabs from '../components/Tabs';
import MarkdownContent from '../components/MarkdownContent';
import Gallery from '../components/Gallery';
import { graphql } from 'gatsby';

export const query = graphql`
    query ($slug: String!) {
        contentfulProject(slug: { eq: $slug }) {
            name
            sleepMode
            summary
            sourceUrl
            demoUrl
            previewImage {
                gatsbyImageData(width: 320)
            }
            description {
                description
            }
            technologies {
                contentful_id
                name
                url
                icon {
                    gatsbyImageData(width: 20)
                }
            }
            gallery {
                contentful_id
                gatsbyImageData
                description
            }
        }
    }
`;
const Project = ({ data }) => {
    const project = data.contentfulProject;
    return (
        <Layout title={project.name} description={project.summary}>
            <ProjectOverview {...project} />
            <Tabs
                list={[
                    {
                        name: 'Description',
                        content: () => (
                            <MarkdownContent
                                content={project.description.description}
                            />
                        ),
                    },
                    {
                        name: `Gallery (${
                            project.gallery ? project.gallery.length : 0
                        })`,
                        content: () => <Gallery list={project.gallery} />,
                    },
                ]}
            />
        </Layout>
    );
};

export default Project;
