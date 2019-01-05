import _merge from 'lodash-es/merge';
import { Ajax } from './ajax';

export interface GitHubOptions {
    accessToken?: string;
    apiBase?: string;
}

export class GitHub {
    private ajax: Ajax;
    private user: User;
    private defaultOptions: GitHubOptions = {
        apiBase: 'https://api.github.com',
    };

    constructor(public options: GitHubOptions) {
        this.options = _merge({}, this.defaultOptions, options);
        this.ajax = new Ajax({
            baseURL: this.options.apiBase,
            headerAuthorization: `Bearer ${this.options.accessToken}`,
        });
    }

    public getUser = () => this.user ? new Promise((resolve) => resolve(this.user)) : this.ajax.get('/user');

    public getGists = () => this.ajax.get('/gists');

    public getGistDetail = (id: string) => this.ajax.get(`/gists/${id}`);

    public createGist = (description: string, files: GistFiles, isPrivate?: boolean) => {
        return this.ajax.post('/gists', {
            public: !isPrivate,
            description,
            files,
        });
    }

    public updateGist = (id: string, description: string, files: GistFiles, isPrivate?: boolean) => {
        return this.ajax.patch(`/gists/${id}`, {
            public: !isPrivate,
            description,
            files,
        });
    }

    public getNotifications = () => this.ajax.get('/notifications');
}

export interface Gist {
    url?: string;
    id?: string;
    html_url?: string;
    files?: GistFiles;
    public?: boolean;
    created_at?: string;
    updated_at?: string;
    description?: string;
    comments?: number;
    truncated?: boolean;
}

export interface GistFiles {
    [key: string]: {filename: string, type: string, language: string, raw_url: string, size: number, truncated: boolean, content: string};
}

export interface User {
    avatar_url?: string;
    bio?: string;
    blog?: string;
    collaborators?: number;
    company?: string;
    created_at?: string;
    disk_usage: number;
    email: string;
    events_url: string;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    hireable: boolean;
    html_url: string;
    id: number;
    location: string;
    login: string;
    name: string;
    node_id: string;
    organizations_url: string;
    owned_private_repos: number;
    plan: any;
    private_gists: number;
    public_gists: number;
    public_repos: number;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    total_private_repos: number;
    two_factor_authentication: boolean;
    type: string;
    updated_at: string;
    url: string;
}

export interface Notification {
    id?: string;
    subject?: {
        title?: string;
        type?: string;
        url?: string;
    };
}

export interface ResponseError {
    message?: string;
    errors?: any[];
}
