import createHTMLElement from '../../../../util/element-creator';
import './buttons.scss';

export default class AutoCompleteButtonView {
    private roundId: string = '';

    private sentenceId: number = 1;

    public create() {
        const button = createHTMLElement('button', 'help-button') as HTMLButtonElement;
        const text = createHTMLElement('p');
        text.textContent = "I don't know";
        button.append(text);
        return button;
    }
}
