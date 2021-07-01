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
import Tags from '../pages/Tags';
import NotFound from '../pages/NotFound';

export const navlinks = [
    '/',
    '/technologies',
    '/categories',
    '/tags',
];

export const routes = (props) => ({
    '/': {
        component: Projects,
        pageData: (props) => {
            return {
                title: 'Projects',
            };
        },
        apiRoute: (props) => ['/projects', {}],
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
        pageData: (props) => {
            return {
                title: 'Projects',
            };
        },
        apiRoute: (props) => {
            let params = {
                page: props.match.params.page,
            };
            return [`/projects`, params];
        },
    },
    '/projects/new': {
        component: ProjectCreator,
        pageData: (props) => {
            return {
                title: 'New Projects',
            };
        },
    },
    '/projects/:project': {
        component: Project,
        pageData: (props) => {
            let project = props.state[props.state.data];
            return {
                title: `${project.name} | Project`,
            };
        },
        apiRoute: (props) => {
            let project = props.match.params.project;
            return [`/projects/${project}`, {}];
        },
        exact: true,
    },
    '/projects/:project/edit': {
        component: ProjectEditor,
        pageData: (props) => {
            return {
                title: 'Edit Project',
            };
        },
        apiRoute: (props) => {
            let project = props.match.params.project;
            return [`/projects/${project}`, {}];
        },
    },
    '/technologies': {
        component: Technologies,
        pageData: (props) => {
            return {
                title: 'Technologies',
            };
        },
        exact: true,
        children: [
            '/technologies/page/:page',
            '/technologies/new',
            '/technologies/:technology/edit',
        ],
        apiRoute: (props) => [`/technologies`, {}],
    },
    '/technologies/page/:page': {
        component: Technologies,
        pageData: (props) => {
            return {
                title: 'Technologies',
            };
        },
        apiRoute: (props) => {
            let params = {
                page: props.match.params.page,
            };
            return [`/technologies/page/${page}`, params];
        },
    },
    '/technologies/new': {
        component: TechnologyCreator,
        pageData: (props) => {
            return {
                title: 'New Technology',
            };
        },
    },
    '/technologies/:technology/edit': {
        component: TechnologyEditor,
        pageData: (props) => {
            return {
                title: 'Edit Technology',
            };
        },
        apiRoute: (props) => {
            let technology = props.match.params.technology;
            return [`/technologies/${technology}`, {}];
        },
    },
    '/categories': {
        component: Categories,
        pageData: (props) => {
            return {
                title: 'Categories',
            };
        },
        exact: true,
        children: [
            '/categories/page/:page',
            '/categories/new',
            '/categories/:category/edit',
        ],
        apiRoute: (props) => [`/categories`, {}],
    },
    '/categories/page/:page': {
        component: Categories,
        pageData: (props) => {
            return {
                title: 'Categories',
            };
        },
        apiRoute: (props) => {
            let params = {
                page: props.match.params.page,
            };
            return [`/categories`, params];
        },
    },
    '/categories/new': {
        component: CategoryCreator,
        pageData: (props) => {
            return {
                title: 'New Category',
            };
        },
    },
    '/categories/:category/edit': {
        component: CategoryEditor,
        pageData: (props) => {
            return {
                title: 'Edit Category',
            };
        },
        apiRoute: (props) => {
            let category = props.match.params.category;
            return [`/categories/${category}`, {}];
        },
    },
    '/tags': {
        component: Tags,
        pageData: (props) => {
            return {
                title: 'Tags',
            };
        },
        apiRoute: (props) => [`/tags`, {}],
        exact: true,
        children: ['/tags/page/:page'],
    },
    '/tags/page/:page': {
        component: Tags,
        pageData: (props) => {
            return {
                title: 'Tags',
            };
        },
        apiRoute: (props) => {
            let params = {
                page: props.match.params.page,
            };
            return [`/tags`, params];
        },
    },
    '': {
        component: NotFound,
        pageData: (props) => {
            return {
                title: 'Not Found',
            };
        },
    },
});
