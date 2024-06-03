import createHTMLElement from '../../../util/element-creator';
import './startScreen.scss';

class StartScreenView {
    public create() {
        const welcomingBlock = createHTMLElement('div', 'welcoming-block');
        const h2Tag = createHTMLElement('h2');
        h2Tag.textContent = `Welcome`;

        const div = createHTMLElement('div', 'logout');
        const a = createHTMLElement('a');
        a.setAttribute('href', '#');
        const spanIconName = createHTMLElement('span');
        const icon = createHTMLElement('ion-icon');
        icon.setAttribute('name', 'log-out-outline');
        spanIconName.append(icon);
        const spanDisplayName = createHTMLElement('span');
        spanDisplayName.textContent = 'Log out';
        a.append(spanIconName, spanDisplayName);
        div.append(a);

        welcomingBlock.append(h2Tag, div);

        document.querySelector('.form-box')?.remove();
        document.querySelector('main')?.append(welcomingBlock);
    }
}

export default StartScreenView;
