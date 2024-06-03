import createHTMLElement from '../../../util/element-creator';
import './gamePage.scss';

class GamePageView {
    public create() {
        const div = createHTMLElement('div', 'playground');
        document.querySelector('main')?.append(div);
    }
}

export default GamePageView;
