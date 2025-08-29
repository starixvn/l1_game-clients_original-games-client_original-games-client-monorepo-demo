import React from "react";
type GameActionsContextType = {
    placeBet: (betChoice: string, amount: number) => void;
};
export declare const GameActionsContextProvider: React.Provider<Partial<GameActionsContextType>>;
export declare const GameActionsContextConsumer: React.Consumer<Partial<GameActionsContextType>>;
export declare const useGameActionContext: () => Partial<GameActionsContextType>;
export {};
