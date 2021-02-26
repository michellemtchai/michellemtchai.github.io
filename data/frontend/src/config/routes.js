import Projects from '../pages/projects';
import AboutUs from '../pages/aboutUs';
import NotFound from '../pages/notFound';

export const navlinks = ['/', '/about-us'];

export const routes = {
    '/': {
        component: Projects,
        title: 'Home',
        exact: true,
    },
    '/about-us': {
        component: AboutUs,
        title: 'About Us',
    },
    '': {
        component: NotFound,
        title: 'Page Not Found',
    }
}
