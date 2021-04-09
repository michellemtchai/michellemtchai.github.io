import React from 'react';
import Home from '../pages/Home';
import Project from '../pages/Project';
import Projects from '../pages/Projects';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';

export const navlinks = (props) => {
    let labels = props.state.categories;
    let links = ['/'];
    Object.keys(labels).forEach((key) => {
        links.push(labels[key].base_url);
    });
    return links;
};

export const routes = (props) => {
    let labels = props.state.categories;
    let categories = {};
    let search = {};
    search['/search/all/:term'] = searchRoute(props.search.term);
    Object.keys(labels).forEach((key) => {
        let label = labels[key];
        let pagesUrl = `${label.base_url}/page`;
        let searchUrl = `/search${label.base_url}/:term`;
        search[searchUrl] = searchRoute(props.search.term);
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
            exact: true,
            description: label.description,
            children: [searchUrl],
        };
        categories[`${pagesUrl}/:page`] =
            categories[label.base_url];
    });
    return {
        '/': {
            component: Home,
            title: 'Home',
            exact: true,
            icon: 'fas fa-home',
            children: ['/search/all/:term'],
        },
        ...search,
        ...categories,
        '/projects/:project': {
            component: Project,
            title: 'Project',
            icon: 'fas fa-tasks',
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
    let paths = Object.keys(routes(props));
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

const searchRoute = (searchTerm) => {
    return {
        title: `Search Results for "${searchTerm}"`,
        component: Search,
        icon: 'fas fa-search',
        exact: true,
        description: `Projects associated with the search term "${searchTerm}".`,
    };
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
