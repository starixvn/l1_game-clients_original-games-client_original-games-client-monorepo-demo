import { GameIds } from "@shared/constants";

type GameLoader = () => Promise<any>;

export const GameRegistry: Record<number, GameLoader> = {
    [GameIds.SeDieMultiplayer]: () => import("@sedie"),
    [GameIds.Baccarat]: () => import("@baccarat"),
};


