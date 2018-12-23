import HomeComponent from './home/HomeComponent';
import GistFormComponent from './gist/GistFormComponent';
const routes = [
    {
        path: '/admin',
        exact: true,
        component: HomeComponent,
    },
    {
        path: '/admin/gist/new',
        exact: true,
        component: GistFormComponent,
    },
];

export default routes;
