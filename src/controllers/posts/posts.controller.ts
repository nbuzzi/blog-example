import { Request, Response } from 'express';
import { User } from '../login/models/user';
import { Comment } from './models/comment';
import { Post } from './models/post';

import loginDBInstance from '../static/loginDB';
import postDBInstance from '../static/postDB';

const getCurrentUser = (): User | undefined => loginDBInstance && loginDBInstance.currentUser;

const isUserLogged = (res: Response): boolean => {
    const currentUser: User | undefined = getCurrentUser();

    if (!currentUser || !currentUser.isLogged) {
        res.redirect('/');
        return false;
    }

    return true;
};

export const index = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        res.sendFile(`${__dirname}/views/index.html`);
    }
};

export const viewById = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        res.sendFile(`${__dirname}/views/view.html`);
    }
};

export const createView = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        res.sendFile(`${__dirname}/views/create.html`);
    }
};

export const getAll = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        const currentUser = getCurrentUser();
        let posts: Post[] = postDBInstance && postDBInstance.posts;

        if (currentUser && !currentUser.isAdmin) {
            posts = posts.filter((m: Post) => ["Private", "Draft"].includes(m.status));
        }

        res.send(posts || []);
    }
};

export const openById = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        res.json(postDBInstance.posts.find((m: Post) => m.id === req.query.postId));
    }
};

export const getCommentsByPostId = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {
        const id = req.query && req.query.postId;

        res.send(id && postDBInstance.filter((m: Post) => m.comments.find((e: Comment) => e.id === id)) || []);
    }
};

export const create = (req: Request, res: Response) => {
    // User not authenticated.
    if (isUserLogged(res)) {

        const body: Post = req.body;

        const isAdmin: boolean = loginDBInstance.currentUser && loginDBInstance.currentUser.isAdmin || false;
        const author: string = isAdmin ? body.author : 'Guest';

        if (body && body.name && body.content && body.previewImageUrl && (isAdmin && body.author || !isAdmin)) {
            // Only the admin posts are public
            const post: Post = {
                author,
                comments: [],
                content: body.content,
                name: body.name,
                previewImageUrl: body.previewImageUrl,
                status: isAdmin ? 'Public' : 'Private',
            };

            res.json(postDBInstance.add(post));
        }

        res.json({
            message: `Error in the request, name, content and previewImageUrl
                are required parameters (author as well being admin).`,
            status: 500,
        });
    }
};

module.exports = {
    create,
    createView,
    getAll,
    getCommentsByPostId,
    index,
    openById,
    viewById,
};
