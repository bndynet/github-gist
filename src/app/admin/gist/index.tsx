import { Gist } from '../../../helpers/github';
import { store } from '../../../redux';

export { default as GistFormComponent } from './GistFormComponent';
export { default as GistListComponent } from './GistListCompnent';
export { default as adminGistActions } from './actions';
export { default as adminGistState } from './reducer';


export interface AdminGistState {
    gists: Gist[];
    currentGist: Gist,
}

export const getState = (): AdminGistState => (store && store.getState().adminGistState) || {};

