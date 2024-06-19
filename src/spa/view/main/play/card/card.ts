import { Sentence } from '../../../../../data/data';
import SentenceService from '../../../../sentence/sentence-service';
import createHTMLElement from '../../../../util/element-creator';
import './card.scss';

class WordCardView {
    constructor(
        private sentenceService: SentenceService,
        private word: string,
        private sentence: Sentence,
        private rowElement: HTMLElement,
        private roundId: string
    ) {}

    public create() {
        const wordDiv = createHTMLElement('div', 'scrambledWord');
        const sentenceLength = SentenceService.getSentenseLength(this.sentence.scrambledWords);
        const wordLength = this.word.length;
        wordDiv.style.width = `${(wordLength / sentenceLength) * 100}%`;
        wordDiv.textContent = this.word;
        const handler = this.cardHandler.bind(this);
        wordDiv.addEventListener('click', (event) => {
            handler(event, 'storage', this.rowElement.id, this.sentence.id);
        });
        wordDiv.addEventListener('click', (event) => {
            handler(event, this.rowElement.id, 'storage', this.sentence.id);
        });
        return wordDiv;
    }

    private cardHandler(event: MouseEvent, parentId: string, targetId: string, sentenceId: number) {
        if (((event.target as HTMLElement).parentNode as HTMLElement).id === parentId) {
            const target = document.querySelector(`#${targetId}`) as HTMLElement;
            const card = event.target as HTMLElement;

            const lastCardRect = (target.lastChild as HTMLElement)?.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const xposition = (lastCardRect ? lastCardRect.right : targetRect.left) - cardRect.left;
            const yposition = targetRect.top - cardRect.top;

            card.style.transform = `translate(${xposition}px,${yposition}px)`;
            card.style.transition = 'all 1s ease-in-out';

            this.rowElement.querySelectorAll('.scrambledWord').forEach((element) => {
                element.classList.remove('incorrectWord');
            });

            (document.querySelector('.check-button') as HTMLElement).style.visibility = 'hidden';

            card.addEventListener(
                'transitionend',
                () => {
                    card.style.transform = 'none';
                    target.append(card);

                    const continueButton = document.querySelector('.continue-button') as HTMLButtonElement;
                    const arrayOfWords = [...document.querySelector('.resultBlock')!.lastChild!.childNodes].map(
                        (element) => element.textContent!
                    );
                    if (this.sentenceService.isValidLength(sentenceId, this.roundId, arrayOfWords)) {
                        const buttonCheck = document.querySelector('.check-button') as HTMLElement;
                        buttonCheck.style.visibility = 'visible';
                        const sentence = this.sentenceService.getSentence(sentenceId, this.roundId);
                        const arrayOfWordsToCheck = sentence.textExample.split(' ');

                        buttonCheck.addEventListener('click', () => {
                            this.rowElement.querySelectorAll('.scrambledWord').forEach((word, index) => {
                                if (word.textContent !== arrayOfWordsToCheck[index]) {
                                    word.classList.add('incorrectWord');
                                }
                            });
                        });

                        if (arrayOfWords.every((word, index) => word === arrayOfWordsToCheck[index]) === true) {
                            continueButton.disabled = false;
                            buttonCheck.style.visibility = 'hidden';
                        }
                    } else {
                        continueButton.disabled = true;
                    }
                },
                { once: true }
            );
        }
    }
}

export default WordCardView;
