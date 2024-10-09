import { User } from '../../data/user';

export default class UserStorage {
    public delete() {
        localStorage.removeItem('userInfo');
    }

    public save(user: User) {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public isAuthorized(): boolean {
        return !!localStorage.userInfo;
    }

    public get(): User {
        return JSON.parse(localStorage.getItem('userInfo') as string) as User;
    }
}
