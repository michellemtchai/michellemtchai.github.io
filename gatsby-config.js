module.exports = {
    siteMetadata: {
        title: process.env.APP_TITLE,
        description: process.env.APP_DESC,
    },
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-fontawesome-css',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-image',
        // 'gatsby-plugin-react-svg',
        // {
        //     resolve: 'gatsby-plugin-react-svg',
        //     options: {
        //         rule: {
        //             include: `/app/src/images`,
        //         },
        //     },
        // },
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                footnotes: false,
                gfm: true,
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/Layout`),
            },
        },
    ],
};
