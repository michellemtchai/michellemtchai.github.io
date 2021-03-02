import Projects from '../pages/projects';
import ProjectCreator from '../pages/projectCreator';
import NotFound from '../pages/notFound';

export const navlinks = ['/'];

export const routes = {
    '/': {
        component: Projects,
        title: 'Projects',
        exact: true,
        children: [
            '/projects/new',
        ]
    },
    '/projects/new': {
        component: ProjectCreator,
        title: 'New Project',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    }
}
