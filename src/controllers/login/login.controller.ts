import { Request, Response } from 'express';
import { User } from './models/user';

import loginDBInstance from '../static/loginDB';

// GET View endpoint.
export const index = (req: Request, res: Response) => res.sendFile(`${__dirname}/views/index.html`);

// API to perform the login.
export const signin = (req: Request, res: Response) => {
    const body: User = req.body;

    if (body && body.email && body.password) {
        const email: string = body.email.toLowerCase();
        const password: string = body.password;

        const userIndex: number = loginDBInstance.users
            // tslint:disable-next-line:triple-equals
            .findIndex((m: User) => ((m.email && m.email.toLowerCase()) === email) && m.password === password);

        res.json({ logged: loginDBInstance.setUserAsLogged(userIndex) });

        return;
    }

    res.status(500);
    res.send({ status: 500, message: 'Error in the request, email and password are required parameters.' });
};

// Signin as a gust.
export const signinAsGuest = (req: Request, res: Response) => {
    const userIndex: number = loginDBInstance.users
        .findIndex((m: User) => !m.isAdmin);

    loginDBInstance.setUserAsLogged(userIndex);

    res.redirect('/posts');
};

// API to retrieve the current logged user.
export const getCurrentUser = (req: Request, res: Response) => res.json(loginDBInstance.currentUser);

// API to retrieve all the logged users.
export const getLoggedUsers = (req: Request, res: Response) => res.json(loginDBInstance.getLoggedUsers);

module.exports = {
    getCurrentUser,
    getLoggedUsers,
    index,
    signin,
    signinAsGuest,
};
