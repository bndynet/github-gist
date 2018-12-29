import { GitHub } from '../../helpers/github';

export interface GistInfo {
    url?: string;
    id?: string;
    html_url?: string;
    public?: boolean;
    created_at?: string;
    updated_at?: string;
    comments?: number;
    truncated?: boolean;
    title?: string;
    content?: string;
}
