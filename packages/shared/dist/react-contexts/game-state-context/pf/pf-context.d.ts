import { PFContextModel } from "./pf-context-model";
export declare const PFContext: import("react").Context<PFContextModel>;
export declare function PFProvider({ children, gameId, uid }: {
    children: any;
    gameId: any;
    uid: any;
}): import("react").JSX.Element;
export declare const usePFContext: () => PFContextModel;
export declare function usePFDispatch(): any;
