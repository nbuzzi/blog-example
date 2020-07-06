import { uuid } from 'uuidv4';

export interface IComment {
    id: string;
    text: string;
    author: string;
}

export class Comment implements IComment {
    public id: string;
    public text: string = '';
    public author: string = '';

    constructor() {
        this.id = uuid();
    }
}
