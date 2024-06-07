import collection from './wordCollectionLevel1.json';

interface Sentence {
    audioExample: string;
    textExample: string;
    scrambledWords?: string[];
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
}

function shuffleArray(array: string[]): string[] {
    const shuffledArray = array;
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export function getScrambledSentence(): string[] {
    let arrayOfSentences = collection.rounds[0].words as Sentence[];

    arrayOfSentences = arrayOfSentences.map((sentence) => {
        const sentenceCopy = sentence;
        let arrayOfWords = sentence.textExample.split(' ');
        arrayOfWords = shuffleArray(arrayOfWords);
        sentenceCopy.scrambledWords = arrayOfWords;
        return sentence;
    });
    return arrayOfSentences[6].scrambledWords!;
}

export function getSentenseLength(words: string[]): number {
    return words.reduce((element: string, currentStr: string): string => {
        return element + currentStr;
    }).length;
}
