import { GameStateContextModel } from "./game-state-context-model";
export declare const GameStateContext: import("react").Context<GameStateContextModel>;
export declare function GameStateProvider({ children }: {
    children: any;
}): import("react").JSX.Element;
export declare const useGameStateContext: () => GameStateContextModel;
export declare function useGameStatesDispatch(): any;
export declare function useGameTranslateContext(): any;
