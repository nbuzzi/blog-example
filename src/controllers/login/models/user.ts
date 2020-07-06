export interface IUser {
    email: string;
    password: string;
    isLogged: boolean;
    isAdmin: boolean;
}

export class User implements IUser {
    public email: string = '';
    public password: string = '';
    public isLogged: boolean = false;
    public isAdmin: boolean = false;
}
