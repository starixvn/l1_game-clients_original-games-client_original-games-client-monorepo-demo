import { Dispatch } from "react";
import { PlaceBetEventAction } from "./place-bet-action";
import { PlaceBetContextModel } from "./place-bet-context-model";
export declare const PlaceBetContext: import("react").Context<PlaceBetContextModel>;
export declare function PlaceBetProvider({ children }: {
    children: any;
}): import("react").JSX.Element;
export declare const usePlaceBetContext: () => PlaceBetContextModel;
export declare function usePlaceBetDispatch(): Dispatch<PlaceBetEventAction>;
