import createHTMLElement from '../../../../util/element-creator';
import './continue-button.scss';
import rightArrow from '../../../../../assets/img/right-arrow.png';

class ContinueButton {
    public create(): HTMLButtonElement {
        const button = createHTMLElement('button', 'continue-button') as HTMLButtonElement;
        button.disabled = true;

        const img = createHTMLElement('img') as HTMLImageElement;
        img.src = rightArrow as string;
        const text = createHTMLElement('p');
        text.textContent = 'Continue';
        button.append(text, img);
        // button.addEventListener('click', this.clickHandler.bind(this));
        return button;
    }

    // private clickHandler() {
    //     const button = document.querySelector('.continue-button') as HTMLButtonElement;
    //     const storage = document.querySelector('.dataStorageBlock') as HTMLElement;
    //     const result = document.querySelector('.resultBlock') as HTMLElement;
    //     const lastRowId = Number((result.lastChild as HTMLElement).id.slice(3));
    //     const nextRow = this.createNextRow(lastRowId + 1, storage);
    //     result?.append(nextRow);
    //     button.disabled = true;
    // }
}

export default ContinueButton;
