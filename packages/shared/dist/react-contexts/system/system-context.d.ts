import { SystemContextModel } from "./system-context-model";
export declare const SystemContext: import("react").Context<Partial<SystemContextModel>>;
export declare const SystemDispatchContext: import("react").Context<any>;
export declare const SystemContextProvider: ({ children }: {
    children: any;
}) => import("react").JSX.Element;
export declare const useSystemContext: () => Partial<SystemContextModel>;
export declare const useSystemDispatch: () => any;
