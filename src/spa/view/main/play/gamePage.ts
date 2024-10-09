import ContinueButton from './buttons/continue-button';
import createHTMLElement from '../../../util/element-creator';
import SentenceService from '../../../sentence/sentence-service';
import WordCardView from './card/card';
import CheckButton from './buttons/check-button';
import AutoCompleteButtonView from './buttons/auto-complite-button';
import './gamePage.scss';
import './card/card.scss';

export default class GamePageView {
    private sentenceService: SentenceService;

    private roundId: string = '';

    constructor() {
        this.sentenceService = new SentenceService();
    }

    public create(): Node {
        const main = createHTMLElement('main');
        const div = createHTMLElement('div', 'playground');
        const result = createHTMLElement('div', 'resultBlock');
        const storage = createHTMLElement('div', 'dataStorageBlock');
        storage.id = 'storage';
        const toolBar = createHTMLElement('div', 'toolbar');

        const checkButton = new CheckButton();
        const buttonCheck = checkButton.create();
        buttonCheck.style.visibility = 'hidden';

        const continueButton = new ContinueButton();
        const buttonContinue = continueButton.create();
        buttonContinue.addEventListener('click', this.buttonClickHandler.bind(this));

        const completeButton = new AutoCompleteButtonView();
        const helpButton = completeButton.create();

        const round = this.sentenceService.getNextRound();
        this.roundId = round.levelData.id;
        const firtsRow = this.createNextSentence(storage);

        if (firtsRow) {
            result.append(firtsRow);
        }
        toolBar.append(helpButton, buttonContinue, buttonCheck);
        div.append(result, storage, toolBar);
        main.append(div);
        return main;
    }

    private createNextSentence(storage: HTMLElement): HTMLElement | null {
        const sentence = this.sentenceService.getNextSentence(this.roundId);

        if (!sentence) {
            return null;
        }
        const row = createHTMLElement('div', 'row');
        const elementId = `row${sentence!.id}`;
        row.id = elementId;
        const scrambledWords = sentence!.scrambledWords!;
        console.log(sentence.textExample);

        // document.querySelector('.help-button')?.addEventListener('click', () => {
        //     console.log('helllooo');
        //     localStorage.setItem('sentence', sentence.textExample);
        // });
        scrambledWords.forEach((word) => {
            const wordCard = new WordCardView(this.sentenceService, word, sentence!, row, this.roundId);
            const wordDiv = wordCard.create();
            storage!.append(wordDiv);
        });

        return row;
    }

    private buttonClickHandler() {
        const button = document.querySelector('.continue-button') as HTMLButtonElement;
        const storage = document.querySelector('.dataStorageBlock') as HTMLElement;
        const result = document.querySelector('.resultBlock') as HTMLElement;
        const nextRow = this.createNextSentence(storage);
        if (nextRow) {
            result?.append(nextRow);
        } else {
            this.createNextRound(result, storage);
        }
        button.disabled = true;
    }

    private createNextRound(result: HTMLElement, storage: HTMLElement) {
        result?.replaceChildren();
        const nextRound = this.sentenceService.getNextRound();
        if (nextRound === undefined) {
            result.append('');
        } else {
            this.roundId = nextRound.levelData.id;
            const firtsRow = this.createNextSentence(storage);
            result.append(firtsRow!);
        }
    }
}
