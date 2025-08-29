import AppSettings from "./type";
export declare const getAppSettings: () => AppSettings;
export declare const getGameSettings: (gameId?: number) => import("../../components/game-base/type").GameSettings;
export declare const getGamesPath: () => string[];
export declare const getGameIdsSetting: () => string[];
