import getSentences from '../../../../data/sentences';
import createHTMLElement from '../../../util/element-creator';
import './gamePage.scss';

class GamePageView {
    public create(): Node {
        const main = createHTMLElement('main');
        const div = createHTMLElement('div', 'playground');
        const result = createHTMLElement('div', 'resultBlock');
        const firtsRow = createHTMLElement('div', 'row');
        result.append(firtsRow);
        const storage = createHTMLElement('div', 'dataStorageBlock');
        const scrambledWords = getSentences();
        scrambledWords.forEach((word, index) => {
            const wordDiv = createHTMLElement('div', 'scrambledWord');
            wordDiv.id = `${index}`;
            wordDiv.textContent = word;
            wordDiv.addEventListener('click', this.cardHandler);

            wordDiv.addEventListener('animationend', () => {
                console.log('animationend1');
                wordDiv.style.transform = 'none';
                const resultBlock = document.querySelector('.row') as HTMLElement;
                resultBlock.append(wordDiv);
            });

            storage.append(wordDiv);
        });

        div.append(result, storage);
        main.append(div);
        return main;
    }

    private cardHandler(event: MouseEvent) {
        const card = event.target as HTMLElement;
        const resultBlock = document.querySelector('.row') as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const resultRect = resultBlock.getBoundingClientRect();
        console.log(cardRect);
        console.log(resultRect);
        const xposition = resultRect.right - resultRect.right;
        const yposition = resultRect.top - cardRect.top;

        card.style.transform = `translate(${xposition}px,${yposition}px)`;

        card.addEventListener(
            'transitionend',
            () => {
                console.log('transitionend');
                card.style.transform = 'none';
                resultBlock.append(card);
            },
            { once: true }
        );
    }
}

export default GamePageView;
