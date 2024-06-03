import { User } from '../../../../data/user';
import createHTMLElement from '../../../util/element-creator';
import './startScreen.scss';

class StartScreenView {
    public create(user: User) {
        const welcomingBlock = createHTMLElement('div', 'welcoming-block');
        const h2Tag = createHTMLElement('h2');
        h2Tag.textContent = `Welcome, ${user.firstName} ${user.surname}!`;
        welcomingBlock.append(h2Tag, this.buildDescriptionArea());

        document.querySelector('.form-box')?.remove();
        document.querySelector('main')?.append(welcomingBlock);
    }

    private buildDescriptionArea(): HTMLElement {
        const description = createHTMLElement('div', 'description');
        const rules = createHTMLElement('div', 'description-rules');
        rules.textContent =
            "RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Players assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.";
        const startButton = createHTMLElement('div', 'description-start');
        startButton.append(this.createButton());
        description.append(rules, startButton);
        return description;
    }

    private createButton(): HTMLElement {
        const button = document.createElement('button');
        const p = document.createElement('p');
        button.id = 'startButton';
        p.textContent = 'START';

        button.append(p);
        return button;
    }
}

export default StartScreenView;
