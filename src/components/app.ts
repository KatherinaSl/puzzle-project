import LoginFormView from './view/login/loginFrom';
import submitHandler from './localStorage/userStorage';

class App {
    loginView;

    constructor() {
        this.loginView = new LoginFormView(submitHandler);
    }

    start() {
        this.loginView.create();
    }
}
export default App;
