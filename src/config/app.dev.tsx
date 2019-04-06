import { Config } from '.';

const config: Config = {
    authorizationCallbackUri: 'http://localhost:8080/auth/callback',
    authorizationUri: 'http://localhost:9100/authorize',
};

module.exports = config;
