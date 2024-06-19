import createHTMLElement from '../../../../util/element-creator';
import checkMark from '../../../../../assets/img/check-mark.png';

export default class CheckButton {
    public create() {
        const button = createHTMLElement('button', 'check-button') as HTMLButtonElement;

        const img = createHTMLElement('img') as HTMLImageElement;
        img.src = checkMark as string;
        const text = createHTMLElement('p');
        text.textContent = 'Check';
        button.append(text, img);
        return button;
    }
}
