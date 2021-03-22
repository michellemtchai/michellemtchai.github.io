import Projects from '../pages/Projects';
import Project from '../pages/Project';
import ProjectCreator from '../pages/ProjectCreator';
import ProjectEditor from '../pages/ProjectEditor';
import Technologies from '../pages/Technologies';
import TechnologyCreator from '../pages/TechnologyCreator';
import TechnologyEditor from '../pages/TechnologyEditor';
import Categories from '../pages/Categories';
import CategoryCreator from '../pages/CategoryCreator';
import CategoryEditor from '../pages/CategoryEditor';
import NotFound from '../pages/NotFound';

export const navlinks = ['/', '/technologies', '/categories'];

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
    '/categories': {
        component: Categories,
        title: 'Categories',
        exact: true,
        children: [
            '/categories/page/:page',
            '/categories/new',
            '/categories/:category/edit',
        ],
    },
    '/categories/page/:page': {
        component: Categories,
        title: 'Categories',
    },
    '/categories/new': {
        component: CategoryCreator,
        title: 'New Category',
    },
    '/categories/:category/edit': {
        component: CategoryEditor,
        title: 'Edit Category',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    },
};
