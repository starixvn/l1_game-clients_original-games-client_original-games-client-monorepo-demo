import { AuthorizeResponse } from "sc-user-service-client/dist/auth";
import { GameSettings } from "@/components/game-base/type";
export declare const getOfferGamesIds: (authorizeInfo: AuthorizeResponse) => number[];
export declare const getRenderGameSettings: (authorizeInfo: AuthorizeResponse) => GameSettings[];
export declare const getServiceStatusIsAvailable: (gameSetting: GameSettings) => Promise<boolean>;
