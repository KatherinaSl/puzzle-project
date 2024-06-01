import './login.scss';
import createHTMLElement from '../../../htmlUtils';

class LoginFormView {
    private WELCOME_PHRASE = 'Welcome!';

    private NAME_PLACEHOLDER = 'Please, enter your first name';

    private SURNAME_PLACEHOLDER = 'Please, enter your surname';

    constructor(private submitHandler: (event: SubmitEvent) => void) {}

    private getRequirements(name: string, minLength: number): string {
        const firstRequirement = `Your ${name} should consist of only English alphabet letters.`;
        const secondRequirement = `Your ${name} should start with the uppercase.`;
        const thirdRequirement = `Your ${name} should consist of at least ${minLength} characters`;
        const forthRequirement = `Your ${name} may contain the hyphen symbol`;

        return `${firstRequirement}\n${secondRequirement}\n${thirdRequirement}\n${forthRequirement}`;
    }

    private createInput(name: string, text: string, requirements: string, pattern: string): HTMLElement {
        const divInput = createHTMLElement('div', 'inputbox');
        const input = createHTMLElement('input') as HTMLInputElement;
        input.placeholder = text;
        input.required = true;
        input.pattern = pattern;
        input.type = 'text';
        input.name = name;
        input.oninvalid = (event) => {
            event.preventDefault();
        };
        const divReq = createHTMLElement('div', 'requirements');
        divReq.textContent = requirements;
        divInput.append(input, divReq);
        return divInput;
    }

    public create() {
        const div = createHTMLElement('div', 'form-box');
        const form = createHTMLElement('form') as HTMLFormElement;
        form.action = '';
        const h2 = createHTMLElement('h2');
        h2.textContent = this.WELCOME_PHRASE;
        const firstInput = this.createInput(
            'firstName',
            this.NAME_PLACEHOLDER,
            this.getRequirements('first name', 3),
            '[A-Z][a-zA-Z\\-]{2,}'
        );
        const secondInput = this.createInput(
            'surname',
            this.SURNAME_PLACEHOLDER,
            this.getRequirements('surname', 4),
            '[A-Z][a-zA-Z\\-]{3,}'
        );
        const button = createHTMLElement('input', 'submit') as HTMLInputElement;
        button.type = 'submit';
        button.value = 'Log in';
        form.addEventListener('submit', this.submitHandler);
        form.append(h2, firstInput, secondInput, button);

        div.append(form);
        document.querySelector('main')?.append(div);
    }
}

export default LoginFormView;
