import Projects from '../pages/projects';
import Project from '../pages/project';
import ProjectCreator from '../pages/projectCreator';
import ProjectEditor from '../pages/projectEditor';
import Technologies from '../pages/technologies';
import TechnologyCreator from '../pages/technologyCreator';
import TechnologyEditor from '../pages/technologyEditor';
import NotFound from '../pages/notFound';

export const navlinks = ['/', '/technologies'];

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
        exact: true,
    },
    '/projects/:project/edit': {
        component: ProjectEditor,
        title: 'Edit Project',
    },
    '/technologies': {
        component: Technologies,
        title: 'Technologies',
        exact: true,
        children: [
            '/technologies/page/:page',
            '/technologies/new',
            '/technologies/:technology/edit',
        ],
    },
    '/technologies/page/:page': {
        component: Technologies,
        title: 'Technologies',
    },
    '/technologies/new': {
        component: TechnologyCreator,
        title: 'New Technology',
    },
    '/technologies/:technology/edit': {
        component: TechnologyEditor,
        title: 'Edit Technology',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    },
};
