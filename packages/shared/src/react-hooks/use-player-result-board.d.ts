export declare const usePlayerResultBoard: () => {
    totalPlayers: number;
    roundId: string;
    tableData: {
        playerName: string;
        betAmount: string;
        win: string;
    }[];
    shouldShowResults: boolean;
    isDisplayingResults: boolean;
};
