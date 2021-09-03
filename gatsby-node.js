const Project = require.resolve('./src/templates/Project.js');
const Category = require.resolve('./src/templates/Category.js');

const pageSetup = (results, errAction, successAction) => {
    if (results.errors) {
        errAction(results);
    } else {
        successAction(results);
    }
};

const contentfulErrorMessage = (resporter, type) => (results) =>
    reporter.panicOnBuild(
        `There was an error loading your Contentful ${type}.`,
        results.errors
    );

const PROJECT_QUERY = `
    query {
        allContentfulProject {
            nodes {
                slug
                altSlug
            }
        }
    }
`;

const CATEGORY_QUERY = `
    query {
        allContentfulCategory {
            nodes {
                slug
            }
        }
    }
`;

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage, createRedirect } = actions;

    pageSetup(
        graphql(PROJECT_QUERY),
        contentfulErrorMessage(resporter, 'projects'),
        ({ data }) => {
            const projects = data.allContentfulProject.nodes;
            projects.forEach((project) => {
                const url = `/projects/${project.slug}/`;
                createPage({
                    path: url,
                    component: Project,
                    context: {
                        slug: project.slug,
                    },
                });
                createRedirect({
                    fromPath: url,
                    toPath: `/projects/${project.altSlug}`,
                    isPermanent: true,
                });
            });
        }
    );

    pageSetup(
        graphql(CATEGORY_QUERY),
        contentfulErrorMessage(resporter, 'categories'),
        ({ data }) => {
            const categories = data.allContentfulProject.nodes;
            categories.forEach((project) => {
                const url = `/categorys/${category.slug}/`;
                createPage({
                    path: url,
                    component: Category,
                    context: {
                        slug: category.slug,
                    },
                });
            });
        }
    );
};
