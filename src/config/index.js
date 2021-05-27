import React, { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
const Project = lazy(() => import('../pages/Project'));
const Projects = lazy(() => import('../pages/Projects'));
const Search = lazy(() => import('../pages/Search'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const navlinks = (props) => {
    let labels = props.state.categories;
    let links = ['/'];
    if (labels) {
        Object.keys(labels).forEach((key) => {
            links.push(labels[key].base_url);
        });
    }
    return links;
};

export const routes = (props) => {
    let [categories, search] = setupCategoriesSearch(props);
    return {
        '/': {
            component: Home,
            exact: true,
            icon: 'fas fa-home',
            pageData: (props) => {
                return {
                    title: 'Home',
                    description: process.env.REACT_APP_DESC,
                };
            },
            apiRoute: (props) => ['/home', {}],
            children: [
                '/all/search/:term',
                '/all/search/:term/page/:page',
            ],
        },
        ...search,
        ...categories,
        '/projects/:project': {
            component: Project,
            icon: 'fas fa-tasks',
            pageData: (props) => {
                let project = props.state[props.state.data];
                return {
                    title: `${project.name} | Project`,
                    description: project.summary,
                };
            },
            apiRoute: (props) => {
                let project = props.match.params.project;
                return [`/projects/${project}`, {}];
            },
        },
        '': {
            component: NotFound,
            icon: 'fas fa-dizzy',
            pageData: (props) => {
                return {
                    title: 'Not Found',
                    description:
                        'You requested page is not found.',
                };
            },
        },
    };
};

export const routeKey = (props, location) => {
    let index = 0;
    let paths = Object.keys(props.routes);
    while (index < paths.length) {
        let path = paths[index];
        if (path === '') {
            return path;
        }
        if (matchingRoute(path, location)) {
            return path;
        }
        index += 1;
    }
};

const setupCategoriesSearch = (props) => {
    let labels = props.state.categories;
    if (!labels) {
        return [{}, {}];
    } else {
        let categories = {};
        let search = {};
        search['/all/search/:term'] = searchRoute(
            'all',
            '/all',
            'All'
        );
        search['/all/search/:term/page/:page'] =
            search['/all/search/:term'];
        Object.keys(labels).forEach((key) => {
            let label = labels[key];
            let pagesUrl = `${label.base_url}/page`;
            let searchUrl = `${label.base_url}/search/:term`;
            search[searchUrl] = searchRoute(
                label._id,
                label.base_url,
                label.name
            );
            search[`${searchUrl}/page/:page`] =
                search[searchUrl];
            let Component = (props) => (
                <Projects
                    baseUrl={pagesUrl}
                    range={label.base_url}
                    keyName={label._id}
                    {...props}
                />
            );
            categories[label.base_url] = {
                component: Component,
                icon: label.icon_class,
                pageData: (props) => {
                    return {
                        title: label.name,
                        description: label.description,
                    };
                },
                apiRoute: (props) => {
                    let params = getProjectsParams(
                        props,
                        label._id,
                        'name'
                    );
                    return [`/projects`, params];
                },
                exact: true,
                children: [
                    `${pagesUrl}/:page`,
                    ...categoryProjects(label),
                    searchUrl,
                    `${searchUrl}/page/:page`,
                ],
            };
            categories[`${pagesUrl}/:page`] =
                categories[label.base_url];
        });
        return [categories, search];
    }
};

const searchRoute = (keyName, range, rangeName) => {
    let Component = (props) => (
        <Search {...props} keyName={keyName} range={range} />
    );
    return {
        component: Component,
        icon: 'fas fa-search',
        pageData: (props) => {
            let term = encodeURIComponent(
                props.match.params.term
            );
            return {
                title: `"${term}" in ${rangeName} | Search Results`,
                description: `Projects associated with the search term "${term}" in the category "${rangeName}".`,
            };
        },
        apiRoute: (props) => {
            let term = encodeURIComponent(
                props.match.params.term
            );
            let params = getProjectsParams(
                props,
                keyName,
                'relevance'
            );
            return [`/projects/search/${term}`, params];
        },
        exact: true,
    };
};

const getProjectsParams = (props, category, defSortBy) => {
    let params = {
        page: props.match.params.page || 1,
        category: category,
    };
    let results = props.results;
    params = {
        ...params,
        sortBy: results ? results.sortBy : defSortBy,
        sortDir: results ? results.sortDir : 'ascending',
    };
    if (
        results &&
        results.filtered.stacks.length !==
            results.filtered.defStacks.length
    ) {
        params.stacks = results.filtered.stacks;
    }
    return params;
};

const categoryProjects = (label) => {
    let projects = [];
    if (label.base_url !== '/featured') {
        projects = label.projects.map((i) => `/projects/${i}`);
    }
    return projects;
};

const matchingRoute = (path, location) => {
    path = path.replace(/\//g, '\\/');
    path = path.replace(
        /:[a-z\d]+/gi,
        '[a-zA-Z\\d_\\-\\.~&$+,=@#;]+'
    );
    let regex = new RegExp(`^${path}$`);
    let result = location.match(regex);
    return result ? true : false;
};

export const socialLinks = [
    {
        icon: 'fab fa-github',
        description: 'GitHub',
        link: 'https://github.com/michellemtchai',
    },
    {
        icon: 'fab fa-linkedin',
        description: 'LinkedIn',
        link: 'https://www.linkedin.com/in/michellemtchai/',
    },
];

export const footer = 'Michelle Chai, 2021';
