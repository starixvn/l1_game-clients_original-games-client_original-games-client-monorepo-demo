import { SettingContextModel } from "./setting-context-model";
export declare const SettingContext: import("react").Context<Partial<SettingContextModel>>;
export declare const SettingDispatchContext: import("react").Context<any>;
export declare const SettingContextProvider: ({ children }: {
    children: any;
}) => import("react").JSX.Element;
export declare const useSettingContext: () => Partial<SettingContextModel>;
export declare const useSettingDispatch: () => any;
