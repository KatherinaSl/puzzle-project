import { getScrambledSentence, getSentenseLength } from '../../../../data/sentences';
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
        const scrambledWords = getScrambledSentence();
        const sentenceLength = getSentenseLength(scrambledWords);

        scrambledWords.forEach((word) => {
            const wordDiv = this.createWordCard(word, sentenceLength);
            storage.append(wordDiv);
        });
        div.append(result, storage);
        main.append(div);
        return main;
    }

    private createWordCard(word: string, sentenceLength: number) {
        const wordDiv = createHTMLElement('div', 'scrambledWord');
        const wordLength = word.length;
        wordDiv.style.width = `${(wordLength / sentenceLength) * 100}%`;
        wordDiv.textContent = word;
        const handler = this.cardHandler.bind(this);
        wordDiv.addEventListener('click', (event) => {
            handler(event, 'dataStorageBlock', 'row');
        });
        wordDiv.addEventListener('click', (event) => {
            handler(event, 'row', 'dataStorageBlock');
        });
        return wordDiv;
    }

    private cardHandler(event: MouseEvent, parentClass: string, targetClass: string) {
        if (((event.target as HTMLElement).parentNode as HTMLElement).classList.contains(parentClass)) {
            const target = document.querySelector(`.${targetClass}`) as HTMLElement;
            const card = event.target as HTMLElement;

            const lastCardRect = (target.lastChild as HTMLElement)?.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const xposition = (lastCardRect ? lastCardRect.right : targetRect.left) - cardRect.left;
            const yposition = targetRect.top - cardRect.top;

            card.style.transform = `translate(${xposition}px,${yposition}px)`;
            card.style.transition = 'all 1s ease-in-out';

            card.addEventListener(
                'transitionend',
                () => {
                    card.style.transform = 'none';
                    target.append(card);
                },
                { once: true }
            );
        }
    }
}

export default GamePageView;
