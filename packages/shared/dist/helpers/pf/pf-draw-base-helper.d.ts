export declare const finalHashToNumbers: (finalHash: string, index: number) => number;
export default class PfDrawBaseHelper {
    static buildRemainingBalls({ ballIndexes, remainingBalls }: {
        ballIndexes: any;
        remainingBalls: any;
    }): {
        results: number[];
        remainingBalls: any[];
    };
    static buildVerifyInfo({ pfResult, combinedHash, ballsEachRound }: {
        pfResult: any;
        combinedHash: any;
        ballsEachRound: any;
    }): {
        results: number[];
        remainingBalls: any[];
        rawDigits: any;
        randomNumbers: number[];
        convertNumber: number[];
        ballIndexes: number[];
    };
}
