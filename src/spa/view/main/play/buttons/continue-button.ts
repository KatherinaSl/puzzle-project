import createHTMLElement from '../../../../util/element-creator';
import rightArrow from '../../../../../assets/img/right-arrow.png';
import './buttons.scss';

export default class ContinueButton {
    public create(): HTMLButtonElement {
        const button = createHTMLElement('button', 'continue-button') as HTMLButtonElement;
        button.disabled = true;

        const img = createHTMLElement('img') as HTMLImageElement;
        img.src = rightArrow as string;
        const text = createHTMLElement('p');
        text.textContent = 'Continue';
        button.append(text, img);
        return button;
    }
}
