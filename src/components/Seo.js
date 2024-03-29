import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { GlobalContext } from '../../GlobalContext.js';

const Seo = ({ lang }) => {
    const { pageTitle, pageDescription } = useContext(GlobalContext);
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    );
    const { title, description } = site.siteMetadata;
    const metaDescription = pageDescription || description;
    return (
        site && (
            <Helmet
                htmlAttributes={{
                    lang,
                }}
                title={title}
                defaultTitle={title}
                titleTemplate={pageTitle ? `${pageTitle} | ${title}` : title}
                meta={[
                    {
                        name: `description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:title`,
                        content: pageTitle || title,
                    },
                    {
                        property: `og:description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                ]}
            />
        )
    );
};

export default Seo;
