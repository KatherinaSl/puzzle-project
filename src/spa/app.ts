import UserStorage from './util/userStorage';
import HeaderView from './view/header/header';
import LoginFormView from './view/main/login/loginFrom';
import StartScreenView from './view/main/start/startScreen';
// import backgroundImage from '../assets/img/background2.png';

class App {
    private loginView: LoginFormView | null;

    private userStorage;

    private startScreenView: StartScreenView | null;

    private headerView: HeaderView | null;

    constructor() {
        this.userStorage = new UserStorage();
        // this.loginView = new LoginFormView();
        // this.startScreenView = new StartScreenView();
        this.loginView = null;
        this.startScreenView = null;
        this.headerView = null;
    }

    public start() {
        if (this.userStorage.isAuthorized()) {
            this.createStartScreenView();
        } else {
            this.createLoginView();
        }
    }

    private createLoginView() {
        this.loginView = new LoginFormView();
        document.querySelector('body')!.append(this.loginView.create());

        if (document.querySelector('.form-box')) {
            document.querySelector('form')?.addEventListener('submit', (event) => {
                this.loginView!.submitHandler(event, this.userStorage);
                this.createStartScreenView();
            });
        }
    }

    private createStartScreenView() {
        this.headerView = new HeaderView();
        document.querySelector('body')!.append(this.headerView.create());
        this.startScreenView = new StartScreenView();
        document.querySelector('body')!.append(this.startScreenView.create(this.userStorage.get()));
        document.querySelector('.logout')?.addEventListener('click', () => {
            this.userStorage.delete();
            this.createLoginView();
        });
    }
}
export default App;
