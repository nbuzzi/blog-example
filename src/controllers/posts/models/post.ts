import { uuid } from 'uuidv4';
import { Comment } from '../models/comment';

export type PostStatus = 'Draft' | 'Private' | 'Public';

export interface IPost {
    id?: string;
    name: string;
    author: string;
    content: string;
    status: PostStatus;
    comments: Comment[];
    previewImageUrl: string;
}

export class Post implements IPost {
    public id?: string;
    public name: string = '';
    public previewImageUrl: string = '';
    public content: string = '';
    public author: string = '';
    public status: PostStatus = 'Draft';
    public comments: Comment[] = [];

    constructor() {
        this.id = uuid();
    }
}
