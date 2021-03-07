import Home from '../pages/Home';
import Project from '../pages/Project';
import NotFound from '../pages/NotFound';

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
