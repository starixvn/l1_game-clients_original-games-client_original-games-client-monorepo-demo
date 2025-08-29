export declare const finalHashToNumbers: (finalHash: string, index: number) => number;
export default class PfRoundBaseHelper {
    static buildVerifyInfo({ pfResult, combinedHash, dicesEachRound }: {
        pfResult: any;
        combinedHash: any;
        dicesEachRound: any;
    }): {
        randomNumbers: number[];
        rawDigits: any;
        convertNumber: number[];
        diceIndexes: number[];
        severSeedRemain: any;
    };
}
