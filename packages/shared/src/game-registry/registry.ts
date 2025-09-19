import { GameRegistry, GameRegistryEntry } from "./types";

class GameRegistryImpl implements GameRegistry {
    private readonly games: Map<number, GameRegistryEntry> = new Map();

    register(entry: GameRegistryEntry): void {
        this.games.set(entry.gameId, entry);
    }

    getLoader(gameId: number): (() => Promise<any>) | null {
        const entry = this.games.get(gameId);
        return entry ? entry.loader : null;
    }

    getAllRegisteredGames(): GameRegistryEntry[] {
        return Array.from(this.games.values());
    }

    isRegistered(gameId: number): boolean {
        return this.games.has(gameId);
    }

    getConfig(gameId: number): GameRegistryEntry['config'] | null {
        const entry = this.games.get(gameId);
        return entry?.config || null;
    }

    getBetPayloadFormat(gameId: number): 'single' | 'map' {
        const config = this.getConfig(gameId);
        return config?.betPayloadFormat || 'map'; // Default to 'map' for unknown games
    }

    requiresClientSeedForBet(gameId: number): boolean {
        const config = this.getConfig(gameId);
        return config?.requiresClientSeedForBet || false;
    }

    allowsDirectAccess(gameId: number): boolean {
        const config = this.getConfig(gameId);
        return config?.allowDirectAccess || false;
    }
}

// Global registry instance
export const gameRegistry = new GameRegistryImpl();

// Convenience function for games to register themselves
export const registerGame = (entry: GameRegistryEntry): void => {
    gameRegistry.register(entry);
};
