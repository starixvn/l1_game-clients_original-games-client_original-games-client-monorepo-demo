import { gameRegistry } from "@shared/game-registry";

/**
 * Ensures all game packages are loaded so they can register themselves
 */
export const ensureGamesLoaded = async (): Promise<void> => {
    // Import all game packages to trigger their registration
    await Promise.all([
        import("@sedie"),
        import("@baccarat"),
    ]);
};

/**
 * Gets the game loader for a specific game ID
 */
export const getGameLoader = (gameId: number): (() => Promise<any>) | null => {
    return gameRegistry.getLoader(gameId);
};

/**
 * Checks if a game is registered
 */
export const isGameRegistered = (gameId: number): boolean => {
    return gameRegistry.isRegistered(gameId);
};

/**
 * Gets all registered games
 */
export const getAllRegisteredGames = () => {
    return gameRegistry.getAllRegisteredGames();
};
