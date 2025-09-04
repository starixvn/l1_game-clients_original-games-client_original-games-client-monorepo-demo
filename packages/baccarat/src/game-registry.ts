import { GameIds } from "@shared/constants";
import { registerGame } from "@shared/game-registry";

// Register the Baccarat game
registerGame({
    gameId: GameIds.Baccarat,
    loader: () => import("./page"),
    metadata: {
        name: "Baccarat",
        version: "1.0.0",
        description: "Baccarat game component"
    }
});
