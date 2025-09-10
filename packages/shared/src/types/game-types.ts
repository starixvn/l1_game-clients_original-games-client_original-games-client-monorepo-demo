// Game types that are shared across packages

export interface GameConfigs {
    odds: { [key: string]: number };
    minBet: number;
    maxBet: number;
    maxBetPerChoices: any;
    enableFreeBet: boolean;
    margin: any;
    chips: string[];
}

export enum RoundState {
    None,
    Disabled,
    InRound,
    LockingBet,
    DisplayResult,
    BeforePlaceBet,
    ConnectFailed,
    SwitchRound,
}

export interface GameSettings {
    id: number;
    tolgeeNamespace?: string;
    gameName: string;
    socketInfo?: SocketInfo;
    durations?: GameDurations;
    numberOfRoundHistory?: number;
    gamePath?: string;
    isComingSoon?: boolean;
    gameResourceConfigs: {
        path: string;
        optionalPaths?: string[];
        cachePaths?: string[];
    };
}

export interface SocketInfo {
    namespace: string;
    path: string;
    serviceName?: string;
}

export interface GameDurations {
    wholeRound: number;
    placingBets: number;
    lockingBet: number;
    showResult: number;
    resultAnimation: number;
    beforePlaceBet: number;
    switchRoundAnimation?: number;
    startNewRoundAnim?: number;
}

export interface UserStakeLevel {
    minBet: number;
    maxBet: number;
}

export interface IUserStakeLevel {
    minBet: number;
    maxBet: number;
}

export interface Round<R, S> {
    roundId: number;
    result: R;
    settlementResult: S;
    pf?: object;
}

export interface DrawInfo {
    roundId: number;
    result: any;
    settlementResult: any;
    odds: any;
    pfResult: PFResult;
    clientSeed: string;
}

export interface PFResult {
    roundId: number;
    serverSeedHash: string;
    serverSeed: string;
    clientSeeds: ClientSeed[];
    mergeSeed: string;
    mergeClientSeed: string;
    roundResult: any[];
    finalHash: string;
    clientSeed: string;
    editedMergeClientSeed: string;
}

export type ClientSeed = {
    name: string;
    clientSeed: string;
};

// Game message handler interface
export interface GameMessageHandler {
    // Define the interface as needed
}

// Message event types
export const messageEventType = {
    // Define the constants as needed
};
