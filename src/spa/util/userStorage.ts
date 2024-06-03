import { User } from '../../data/user';

class UserStorage {
    public delete() {
        localStorage.removeItem('userInfo');
    }

    public save(user: User) {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public isAuthorized(): boolean {
        return !!localStorage.userInfo;
    }
}

export default UserStorage;
