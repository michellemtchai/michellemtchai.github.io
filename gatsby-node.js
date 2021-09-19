const Project = require.resolve('./src/templates/Project.js');
const Category = require.resolve('./src/templates/Category.js');

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

const categorySlug = (categories) => {
    for (let i = 0; i < categories.length; i++) {
        const slug = categories[i].slug;
        if (slug !== 'featured') {
            return slug;
        }
    }
    return null;
};

const PROJECT_QUERY = `
    query {
        allContentfulProject {
            nodes {
                slug
                altSlug
                category{
                    slug
                }
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
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;
    if (page.path.match(/^\/search/)) {
        page.matchPath = '/search/*';
        createPage(page);
    }
};

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
                        category: categorySlug(project.category),
                    },
                });
                if (project.altSlug) {
                    createRedirect({
                        fromPath: `/projects/${project.altSlug}`,
                        isPermanent: true,
                        redirectInBrowser: true,
                        toPath: url,
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
                createPage({
                    path: `/${category.slug}`,
                    component: Category,
                    context: {
                        slug: category.slug,
                    },
                });
            });
        }
    );
};
