import Home from '../pages/Home';
import Project from '../pages/Project';
import NotFound from '../pages/NotFound';

export const title = "Michelle's Home Page"

export const navlinks = ['/', '/projec', '/projects/1'];

export const routes = {
    '/': {
        component: Home,
        title: 'Home',
        exact: true,
        icon: 'fas fa-home',
    },
    '/projects/:project': {
        component: Project,
        title: 'Project',
        icon: 'fas fa-tasks',
    },
    '': {
        component: NotFound,
        title: 'Not Found',
        icon: 'fas fa-dizzy',
    }
}

export const routeKey = (location)=>{
    let index = 0;
    let paths = Object.keys(routes);
    while(index < paths.length){
        let path = paths[index];
        if(path === ''){
            return path;
        }
        if(matchingRoute(path, location)){
            return path;
        }
        index+=1;
    }
}

const matchingRoute = (path, location)=>{
    path = path.replace(/\//g, '\\/');
    path = path.replace(/:[a-z\d]+/gi,
        '[a-zA-Z\\d_\\-\\.~&$\+,=@#;]+')
    let regex = new RegExp(`^${path}$`);
    let result = location.match(regex);
    return result ? true : false;
}

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
]

export const footer = 'Michelle Chai, 2021';
