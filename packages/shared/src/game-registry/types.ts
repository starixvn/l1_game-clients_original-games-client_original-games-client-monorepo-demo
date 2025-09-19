export interface GameRegistryEntry {
    gameId: number;
    loader: () => Promise<any>;
    metadata?: {
        name: string;
        version?: string;
        description?: string;
    };
    config?: {
        betPayloadFormat: 'single' | 'map';
        requiresClientSeedForBet: boolean;
        allowDirectAccess: boolean;
    };
}

export interface GameRegistry {
    register(entry: GameRegistryEntry): void;
    getLoader(gameId: number): (() => Promise<any>) | null;
    getAllRegisteredGames(): GameRegistryEntry[];
    isRegistered(gameId: number): boolean;
    getConfig(gameId: number): GameRegistryEntry['config'] | null;
    getBetPayloadFormat(gameId: number): 'single' | 'map';
    requiresClientSeedForBet(gameId: number): boolean;
    allowsDirectAccess(gameId: number): boolean;
}

export type GameLoader = () => Promise<any>;
