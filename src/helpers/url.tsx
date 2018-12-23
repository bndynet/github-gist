import { parse, OutputParams, stringify } from 'query-string';

export class Url {

    public queries: OutputParams;
    public hashs: OutputParams;

    constructor(url?: string) {
        if (!url) {
            this.queries = parse(location.search);
            this.hashs = parse(location.hash);
        }
    }

    public redirect(queriesOrUrl: object | string) {
        if (typeof queriesOrUrl === 'string') {
            location.href = queriesOrUrl;
        } else {
            location.search = stringify(queriesOrUrl);
        }
    }
}

export const instance = (url?: string): Url => new Url(url);
