import { User } from '../login/models/user';
import { GenericDatabase } from './base';

export class LoginDB extends GenericDatabase<User> {

    constructor() {
        super([
            {
                email: 'admin',
                isAdmin: true,
                isLogged: false,
                password: '1234',
            },
            {
                email: 'guest@example.com',
                isAdmin: false,
                isLogged: false,
                password: '1234',
            },
        ]);
    }

    public get users() {
        return this.list;
    }

    public get currentUser(): User | undefined {
        return this.entities.find((m: User) => m.isLogged);
    }

    public get isAdmin(): boolean {
        return this.currentUser && this.currentUser.isAdmin || false;
    }

    public filter(expression: any): User[] {
        return this.filter(expression);
    }

    public find(email: string, password: string): User | undefined {
        return this.entities.find((m: User) => m.email === email && m.password === password);
    }

    public setUserAsLogged(userIndex: number): boolean {
        if (userIndex >= 0 && this.entities[userIndex]) {
            this.entities[userIndex].isLogged = true;
        }

        return Boolean(userIndex >= 0 && this.entities[userIndex]);
    }
}

const loginDBInstance = new LoginDB();

export default loginDBInstance;
