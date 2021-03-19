import Projects from '../pages/projects';
import Project from '../pages/project';
import ProjectCreator from '../pages/projectCreator';
import ProjectEditor from '../pages/projectEditor';
import NotFound from '../pages/notFound';

export const navlinks = ['/'];

export const routes = {
    '/': {
        component: Projects,
        title: 'Projects',
        exact: true,
        children: [
            '/projects/new',
            '/projects/:project',
            '/projects/:project/edit',
            '/projects/page/:page',
        ],
    },
    '/projects/page/:page': {
        component: Projects,
        title: 'Projects',
    },
    '/projects/new': {
        component: ProjectCreator,
        title: 'New Project',
    },
    '/projects/:project': {
        component: Project,
        title: 'Project',
    },
    '/projects/:project/edit': {
        component: ProjectEditor,
        title: 'Edit Project',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    },
};
