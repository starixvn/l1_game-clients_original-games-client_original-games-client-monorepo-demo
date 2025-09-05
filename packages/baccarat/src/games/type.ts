import { UserStakeLevel } from "@shared/components/game-base/type";

export type Props = {
    setApiErrorMessage: Function;
    userStakeLevel: UserStakeLevel;
    updateUserStakeLevel: Function;
    openGameId: number;
    openGameName: string;
};
