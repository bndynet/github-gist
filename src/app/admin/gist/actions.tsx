import { Gist } from '../../../helpers/github';

export const ACTION_LIST_GISTS_REQUEST = 'ACTION_GISTS_REQUEST';
export const ACTION_LIST_GISTS_SUCCESS = 'ACTION_GISTS_SUCCESS';

export const ACTION_GIST_CREATE_REQUEST = 'ACTION_GIST_CREATE_REQUEST';
export const ACTION_GIST_CREATE_SUCCESS = 'ACTION_GIST_CREATE_SUCCESS';

export const ACTION_GIST_UPDATE_REQUEST = 'ACTION_GIST_UPDATE_REQUEST';
export const ACTION_GIST_UPDATE_SUCCESS = 'ACTION_GIST_UPDATE_SUCCESS';

export const ACTION_GIST_EDIT = 'ACTION_GIST_EDIT';

export const ACTION_GIST_GET_DETAIL_REQUEST = 'ACTION_GIST_GET_DETAIL_REQUEST';
export const ACTION_GIST_GET_DETAIL_SUCCESS = 'ACTION_GIST_GET_DETAIL_SUCCESS';
export const ACTION_GIST_GET_DETAIL_FAILURE = 'ACTION_GIST_GET_DETAIL_FAILURE';

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

    editGist: (gist: Gist) => ({
        type: ACTION_GIST_EDIT,
        payload: gist,
    }),
    updateGist: (id: string, title: string, content: string, isPrivate: boolean) => ({
        type: ACTION_GIST_UPDATE_REQUEST,
        payload: {
            id, title, content, isPrivate,
        },
    }),
    updateGistSuccess: (gist: Gist) => ({
        type: ACTION_GIST_EDIT,
        payload: gist,
    }),

    getGistDetail: (id: string, resolve?: () => void) => ({
        type: ACTION_GIST_GET_DETAIL_REQUEST,
        payload: id,
        resolve,
    }),
    getGistDetailSuccess: (gist: Gist) => ({
        type: ACTION_GIST_GET_DETAIL_SUCCESS,
        payload: gist,
    }),
};

export default actions;
