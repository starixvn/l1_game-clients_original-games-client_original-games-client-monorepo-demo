import { gameRegistry, registerGame } from "@shared/game-registry";
import { GameIds } from "@shared/constants";

describe("Game Discovery", () => {
    beforeEach(() => {
        // Clear the registry before each test
        // Note: In a real implementation, you might want to add a clear method to the registry
    });

    it("should register a game successfully", () => {
        const mockLoader = jest.fn(() => Promise.resolve({}));

        registerGame({
            gameId: GameIds.SeDieMultiplayer,
            loader: mockLoader,
            metadata: {
                name: "Test Game",
                version: "1.0.0"
            }
        });

        expect(gameRegistry.isRegistered(GameIds.SeDieMultiplayer)).toBe(true);
        expect(gameRegistry.getLoader(GameIds.SeDieMultiplayer)).toBe(mockLoader);
    });

    it("should return null for unregistered game", () => {
        expect(gameRegistry.getLoader(9999)).toBeNull();
        expect(gameRegistry.isRegistered(9999)).toBe(false);
    });

    it("should return all registered games", () => {
        const mockLoader1 = jest.fn(() => Promise.resolve({}));
        const mockLoader2 = jest.fn(() => Promise.resolve({}));

        registerGame({
            gameId: GameIds.SeDieMultiplayer,
            loader: mockLoader1,
            metadata: { name: "Game 1" }
        });

        registerGame({
            gameId: GameIds.Baccarat,
            loader: mockLoader2,
            metadata: { name: "Game 2" }
        });

        const registeredGames = gameRegistry.getAllRegisteredGames();
        expect(registeredGames).toHaveLength(2);
        expect(registeredGames.some(game => game.gameId === GameIds.SeDieMultiplayer)).toBe(true);
        expect(registeredGames.some(game => game.gameId === GameIds.Baccarat)).toBe(true);
    });
});
