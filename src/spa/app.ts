import UserStorage from './util/userStorage';
import LoginFormView from './view/main/login/loginFrom';
import StartScreenView from './view/main/start/startScreen';

class App {
    private loginView;

    private userStorage;

    private startScreenView;

    constructor() {
        this.userStorage = new UserStorage();
        this.loginView = new LoginFormView();
        this.startScreenView = new StartScreenView();
    }

    public start() {
        if (this.userStorage.isAuthorized()) {
            this.createStartScreenView();
        } else {
            this.createLoginView();
        }
    }

    private createLoginView() {
        this.loginView.create();
        if (document.querySelector('.form-box')) {
            document.querySelector('form')?.addEventListener('submit', (event) => {
                this.loginView.submitHandler(event, this.userStorage);
                this.createStartScreenView();
            });
        }
    }

    private createStartScreenView() {
        this.startScreenView.create();
        document.querySelector('.logout')?.addEventListener('click', () => {
            this.userStorage.delete();
            this.createLoginView();
        });
    }
}
export default App;
