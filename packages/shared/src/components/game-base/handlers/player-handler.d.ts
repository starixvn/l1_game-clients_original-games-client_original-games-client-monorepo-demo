import { GameMessageHandler } from "./game-message-handler";
export type PlayerHandlerProps = {
    gameName: string;
    dispatch: Function;
    gameMessageHandler: GameMessageHandler;
};
declare class Player {
    name: string;
    UID: number;
    avatarId: number;
    currency: string;
    joinedOn: string;
    red: number;
    scoins?: number;
    type: boolean;
    rate?: number;
    minBet: number;
    maxBet: number;
    offerGames?: {
        gameId: number;
    }[];
    availSpins?: number;
    fractionalOddsFormat?: boolean;
    isDisplayPlayerCurrency?: boolean;
    disableJackpotGames?: boolean;
}
declare class UserStakeLevel {
    minBet: number;
    maxBet: number;
}
export declare class PlayerHandler {
    private readonly props;
    constructor(props: PlayerHandlerProps);
    registerEvents: () => void;
    handleRestrictPermission: ({ notPermittedToPlay, userStakeLevel, }: {
        notPermittedToPlay: boolean;
        userStakeLevel: UserStakeLevel;
    }) => void;
    handleUserStakeLevel({ userStakeLevel, hasNotice }: {
        userStakeLevel: any;
        hasNotice?: boolean;
    }): void;
    handleUserData({ user, gameConfigs }: {
        user: Player;
        gameConfigs: any;
    }): void;
}
export {};
