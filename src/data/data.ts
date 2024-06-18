export interface Sentence {
    audioExample: string;
    textExample: string;
    scrambledWords?: string[];
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
}

export interface LevelData {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
}

export interface Round {
    levelData: LevelData;
    words: Sentence[];
}

export function shuffleArray(array: string[]): string[] {
    const shuffledArray = array;
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
