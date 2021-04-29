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
            title: 'Home',
            exact: true,
            icon: 'fas fa-home',
            apiRoute: (props) => '/',
            children: [
                '/all/search/:term',
                '/all/search/:term/page/:page',
            ],
        },
        ...search,
        ...categories,
        '/projects/:project': {
            component: Project,
            title: 'Project',
            icon: 'fas fa-tasks',
            apiRoute: (props) => {
                let project = props.match.params.project;
                return `/projects/${project}`;
            },
        },
        '': {
            component: NotFound,
            title: 'Not Found',
            icon: 'fas fa-dizzy',
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
        search['/all/search/:term'] = searchRoute('all', '/all');
        search['/all/search/:term/page/:page'] =
            search['/all/search/:term'];
        Object.keys(labels).forEach((key) => {
            let label = labels[key];
            let pagesUrl = `${label.base_url}/page`;
            let searchUrl = `${label.base_url}/search/:term`;
            search[searchUrl] = searchRoute(
                label._id,
                label.base_url
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
                title: label.name,
                component: Component,
                icon: label.icon_class,
                apiRoute: (props) => {
                    let page = props.match.params.page
                        ? encodeURIComponent(
                              props.match.params.page
                          )
                        : 1;
                    let category = encodeURIComponent(label._id);
                    return `/projects?page=${page}&category=${category}`;
                },
                exact: true,
                description: label.description,
                children: [
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

const searchRoute = (keyName, range) => {
    let Component = (props) => (
        <Search {...props} keyName={keyName} range={range} />
    );
    return {
        title: 'Search Results',
        component: Component,
        icon: 'fas fa-search',
        apiRoute: (props) => {
            let term = encodeURIComponent(
                props.match.params.term
            );
            let page = props.match.params.page
                ? encodeURIComponent(props.match.params.page)
                : 1;
            let category = encodeURIComponent(keyName);
            return `/projects/search/${term}?page=${page}&category=${category}`;
        },
        exact: true,
        description: 'Projects associated with the search term.',
    };
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
