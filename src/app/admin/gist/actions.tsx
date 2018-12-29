import { Gist } from '../../../helpers/github';

export const ACTION_LIST_GISTS_REQUEST = 'ACTION_GISTS_REQUEST';
export const ACTION_LIST_GISTS_SUCCESS = 'ACTION_GISTS_SUCCESS';

export const ACTION_GIST_CREATE_REQUEST = 'ACTION_GIST_CREATE_REQUEST';
export const ACTION_GIST_CREATE_SUCCESS = 'ACTION_GIST_CREATE_SUCCESS';

export const ACTION_GIST_UPDATE_REQUEST = 'ACTION_GIST_UPDATE_REQUEST';
export const ACTION_GIST_UPDATE_SUCCESS = 'ACTION_GIST_UPDATE_SUCCESS';

const actions = {
    listGists: () => ({
        type: ACTION_LIST_GISTS_REQUEST,
    }),

    listGistsSuccess: (gists: Gist[]) => ({
        type: ACTION_LIST_GISTS_SUCCESS,
        payload: gists,
    }),

    createGist: (title: string, content: string, isPrivate: boolean) => ({
        type: ACTION_GIST_CREATE_REQUEST,
        payload: {
            title, content, isPrivate,
        },
    }),
    createGistSuccess: (gist: Gist) => ({
        type: ACTION_GIST_CREATE_SUCCESS,
        payload: gist,
    }),

    updateGist: (id: string, title: string, content: string, isPrivate: boolean) => ({
        type: ACTION_GIST_UPDATE_REQUEST,
        payload: {
            id, title, content, isPrivate,
        },
    }),
    updateGistSuccess: (gist: Gist) => ({
        type: ACTION_GIST_UPDATE_SUCCESS,
        payload: gist,
    }),
};

export default actions;
