import { Round, Sentence, shuffleArray } from '../../data/data';
import collection from '../../data/backup.json';

export default class SentenceService {
    private sentenceIndex: number = 0;

    private roundIndex: number = 0;

    public getNextSentence(roundId: string): Sentence | null {
        const round = (collection.rounds as Round[]).find((element) => roundId === element.levelData.id);
        if (!round || this.sentenceIndex >= (round as Round).words.length) {
            this.sentenceIndex = 0;
            return null;
        }

        const sentence = (round as Round).words[this.sentenceIndex];
        sentence.scrambledWords = this.getScrambledSentence(sentence);
        this.sentenceIndex += 1;
        return sentence;
    }

    public isValidLength(sentenceId: number, roundId: string, arrayOfWordsToCheck: string[]): boolean {
        const sentence = this.getSentence(sentenceId, roundId);
        const arrayOfWords = sentence.textExample.split(' ');
        if (arrayOfWordsToCheck.length !== arrayOfWords.length) {
            return false;
        }
        return true;
    }

    private getScrambledSentence(sentence: Sentence): string[] {
        let arrayOfWords = sentence.textExample.split(' ');
        arrayOfWords = shuffleArray(arrayOfWords);
        return arrayOfWords;
    }

    public getSentence(sentenceId: number, roundId: string): Sentence {
        const round = (collection.rounds as Round[]).find((element) => roundId === element.levelData.id);

        return round!.words.find((element) => sentenceId === element.id)!;
    }

    public static getSentenseLength(words?: string[]): number {
        const length = words?.reduce((element: string, currentStr: string): string => {
            return element + currentStr;
        }).length;
        return length || 0;
    }

    public getNextRound(): Round {
        const round = collection.rounds[this.roundIndex];
        this.roundIndex += 1;
        return round;
    }
}
