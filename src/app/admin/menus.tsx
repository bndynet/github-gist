import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const menus = [
    {
        icon: <HomeIcon />,
        text: 'Home',
        link: '/admin',
    },
    {
        icon: <NoteAddIcon />,
        text: 'Create gist',
        description: '',
        link: '/admin/gist/new',
    },
    {
        icon: <ViewListIcon />,
        text: 'Manage gist',
        description: '',
        link: '/admin/gist/list',
    },
];

export default menus;
