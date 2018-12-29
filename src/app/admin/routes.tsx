import HomeComponent from './home/HomeComponent';
import { GistFormComponent, GistListComponent } from './gist';
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
    {
        path: '/admin/gist/list',
        exact: true,
        component: GistListComponent,
    },
];

export default routes;
