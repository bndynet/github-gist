import { AxiosPromise } from 'axios';
import { Ajax } from '../../helpers/ajax';
import { instance } from '../../helpers/url';
import config from '../../config';

import actions from './actions';
import { getState } from './';

const service = {
    auth: (): void => {
        location.href = `${config.authorizationUri}?redirect_uri=${config.authorizationCallbackUri}&target=github`;
    },
    getErrorFromUrl: (): string => {
        const url = instance();
        return url.queries.error_description as string;
    },
    getTokenFromUrl: (): string => {
        const url = instance();
        return url.queries.access_token as string;
    },
    getUser: (): AxiosPromise => {
        return new Ajax({
            baseURL: config.userUri,
            headerAuthorization: () => `Bearer ${getState().accessToken}`,
        }).get('');
    },
    logout: (logoutGitHub?: boolean) => {
        if (logoutGitHub) {
            location.href = config.logoutUri;
        } else {
            actions.logout();
        }
    },
};

export default service;
