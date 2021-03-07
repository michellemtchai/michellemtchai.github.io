import Home from '../pages/Home';
import Project from '../pages/Project';
import NotFound from '../pages/NotFound';

export const title = "Michelle's Home Page"

export const navlinks = ['/'];

export const routes = {
    '/': {
        component: Home,
        title: 'Home',
        exact: true,
    },
    '/projects/:project': {
        component: Project,
        title: 'Project',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    }
}

export const socialLinks = [
    {
        icon: 'fa fa-github-alt',
        description: 'GitHub',
        link: 'https://github.com/michellemtchai',
    },
    {
        icon: 'fa fa-linkedin-square',
        description: 'LinkedIn',
        link: 'https://www.linkedin.com/in/michellemtchai/',
    },
]

export const footer = 'Michelle Chai, 2021';
