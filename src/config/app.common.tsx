import { Config } from '.';

const config: Config = {
    defaultLocale: 'en',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    userUri: 'https://api.github.com/user',
    logoutUri: 'https://github.com/logout',
    scopes: ['notifications', 'gist'],
    resourceBaseUri: '/',
};

module.exports = config;
