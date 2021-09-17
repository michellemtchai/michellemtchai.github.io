import React from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
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
                gatsbyImageData(
                    width: 320
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                )
            }
            description {
                childMarkdownRemark {
                    html
                }
            }
            technologies {
                contentful_id
                name
                url
                icon {
                    gatsbyImageData(
                        width: 20
                        placeholder: BLURRED
                        formats: [AUTO, WEBP]
                    )
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
const Project = ({ data, pageContext }) => {
    const project = data.contentfulProject;
    return (
        <Layout
            title={project.name}
            description={project.summary}
            category={pageContext.category}
        >
            <SearchBar />
            <ProjectOverview {...project} />
            <Tabs
                list={[
                    {
                        name: 'Description',
                        link: 'description',
                        content: () => (
                            <MarkdownContent
                                content={
                                    project.description.childMarkdownRemark.html
                                }
                            />
                        ),
                    },
                    {
                        name: `Gallery (${
                            project.gallery ? project.gallery.length : 0
                        })`,
                        link: 'gallery',
                        content: () => <Gallery list={project.gallery} />,
                    },
                ]}
            />
        </Layout>
    );
};

export default Project;
