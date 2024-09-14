import React, { useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import ProjectOverview from '../components/ProjectOverview';
import Tabs from '../components/Tabs';
import MarkdownContent from '../components/MarkdownContent';
import Gallery from '../components/Gallery';
import { graphql } from 'gatsby';
import { GlobalContext } from '../../GlobalContext.js';

export const query = graphql`
    query ($slug: String!) {
        contentfulProject(slug: { eq: $slug }) {
            name
            archivedCode
            sleepMode
            summary
            sourceUrl
            demoUrl
            previewImage {
                gatsbyImageData(
                    width: 600
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
                        width: 12
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
const Project = ({ scrollToTop, data, pageContext }) => {
    const project = data.contentfulProject;
    project.technologies.sort((a, b) => a.name.localeCompare(b.name));
    const { setTitle, setDescription, setSelectedCategory } =
        useContext(GlobalContext);
    useEffect(() => {
        setTitle(project.name);
        setDescription(project.summary);
        setSelectedCategory(pageContext.category);
        scrollToTop();
    }, []);
    return (
        <>
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
        </>
    );
};

export default Project;
