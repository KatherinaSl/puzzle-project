import './login.scss';
import createHTMLElement from '../../../htmlUtils';

function createInput(text: string): HTMLElement {
    const divInput = createHTMLElement('div', 'inputbox');
    const input = document.createElement('input');
    input.setAttribute('type', text);
    input.setAttribute('placeholder', text);
    input.required = true;
    divInput.append(input);
    return divInput;
}

function createLoginForm() {
    const div = createHTMLElement('div', 'form-box');
    const form = document.createElement('form');
    form.action = '';
    const h2 = document.createElement('h2');
    h2.textContent = 'Welcome!';
    const firstInput = createInput('Please, enter your first name');
    const secondInput = createInput('Please, enter your surname');
    form.append(h2, firstInput, secondInput);

    const button = createHTMLElement('button', 'form-button');
    (button as HTMLButtonElement).disabled = true;
    const divButton = document.createElement('div');
    divButton.textContent = 'Log in';
    button.append(divButton);

    div.append(form, button);
    document.querySelector('main')?.append(div);
}

export default createLoginForm;
