export declare function parseTranslationKey(input: string): {
    key: string;
    ns: string;
} | {
    key: string;
    ns?: undefined;
};
export declare const useTranslator: (gameNamespaces?: string[]) => {
    t: (key: string, params?: any, opt?: any) => string;
};
export declare const useCommonTranslate: () => import("@tolgee/react").UseTranslateResult;
export declare const useSNTranslate: () => import("@tolgee/react").UseTranslateResult;
export declare const useSedieMultiplayerTranslate: () => import("@tolgee/react").UseTranslateResult;
