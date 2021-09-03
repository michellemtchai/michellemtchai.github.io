const Project = require.resolve('./src/templates/Project.js');
const Category = require.resolve('./src/templates/Category.js');
const Redirect = require.resolve('./src/templates/Redirect.js');

const pageSetup = (results, errAction, successAction) => {
    if (results.errors) {
        errAction(results.errors);
    } else {
        successAction(results.data);
    }
};

const contentfulErrorMessage = (reporter, type) => (errors) =>
    reporter.panicOnBuild(
        `There was an error loading your Contentful ${type}.`,
        errors
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
        await graphql(PROJECT_QUERY),
        contentfulErrorMessage(reporter, 'projects'),
        ({ allContentfulProject }) => {
            const projects = allContentfulProject.nodes;
            projects.forEach((project) => {
                const url = `/projects/${project.slug}`;
                createPage({
                    path: url,
                    component: Project,
                    context: {
                        slug: project.slug,
                    },
                });
                if (project.altSlug) {
                    createPage({
                        path: `/projects/${project.altSlug}`,
                        component: Redirect,
                        context: {
                            url: url,
                        },
                    });
                }
            });
        }
    );

    pageSetup(
        await graphql(CATEGORY_QUERY),
        contentfulErrorMessage(reporter, 'categories'),
        ({ allContentfulCategory }) => {
            const categories = allContentfulCategory.nodes;
            categories.forEach((category) => {
                const url = `/categories/${category.slug}/`;
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
