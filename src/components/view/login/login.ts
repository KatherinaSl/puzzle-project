import './login.scss';
import createHTMLElement from '../../../htmlUtils';

const WELCOME_PHRASE = 'Welcome!';
const NAME_PLACEHOLDER = 'Please, enter your first name';
const SURNAME_PLACEHOLDER = 'Please, enter your surname';

function createInput(text: string, requirements: string, pattern: string): HTMLElement {
    const divInput = createHTMLElement('div', 'inputbox');
    const input = document.createElement('input');
    input.setAttribute('type', text);
    input.setAttribute('placeholder', text);
    input.required = true;
    input.pattern = pattern;
    input.type = 'text';
    input.oninvalid = (event) => {
        event.preventDefault();
    };
    const divReq = createHTMLElement('div', 'requirements');
    divReq.textContent = requirements;
    divInput.append(input, divReq);
    return divInput;
}

function getRequirements(name: string, minLength: number): string {
    const firstRequirement = `Your ${name} should consist of only English alphabet letters.`;
    const secondRequirement = `Your ${name} should start with the uppercase.`;
    const thirdRequirement = `Your ${name} should consist of at least ${minLength} characters`;
    const forthRequirement = `Your ${name} may contain the hyphen symbol`;

    return `${firstRequirement}\n${secondRequirement}\n${thirdRequirement}\n${forthRequirement}`;
}

function createLoginForm() {
    const div = createHTMLElement('div', 'form-box');
    const form = document.createElement('form');
    form.action = '';
    const h2 = document.createElement('h2');
    h2.textContent = WELCOME_PHRASE;
    const firstInput = createInput(NAME_PLACEHOLDER, getRequirements('first name', 3), '[A-Z][a-zA-Z\\-]{2,}');
    const secondInput = createInput(SURNAME_PLACEHOLDER, getRequirements('surname', 4), '[A-Z][a-zA-Z\\-]{3,}');
    const button = createHTMLElement('input', 'submit') as HTMLInputElement;
    button.type = 'submit';
    button.value = 'Log in';
    form.append(h2, firstInput, secondInput, button);

    div.append(form);
    document.querySelector('main')?.append(div);
}

export default createLoginForm;
