export interface BetOptionData {
    betChoice: string;
    odds: number;
    totalStakes?: number;
    players?: number;
    percent?: number;
}
export interface RoundResultData {
    betChoiceShort: string;
    color: string;
    count: number;
}
export interface Round {
    roundId: number;
    result: any;
    settlementResult: any;
}
export declare const systemName: string;
export declare const locales: {
    en: string;
    vi: string;
    th: string;
    id: string;
    zh_cn: string;
    zh_tw: string;
    ja: string;
};
export declare const languageMapper: {
    "en-US": string;
    "vi-VN": string;
    "th-TH": string;
    "id-ID": string;
    "zh-CN": string;
    "zh-TW": string;
    "ja-JP": string;
};
export declare const LanguageLocaleMapper: {
    en: string;
    vi: string;
    th: string;
    id: string;
    zh_cn: string;
    zh_tw: string;
    ja: string;
};
export declare const languageNameMapper: {
    en: string;
    vi: string;
};
export declare const Themes: {
    dark: string;
    light: string;
    numberGame: string;
};
export declare const sabaNumberName = "Saba.numbers";
export declare const sabaClubName = "Saba.games";
export declare const buildVersion: string | number;
export declare const AppTypes: {
    mobile: number;
};
export declare const confirmBet = "confirmBet";
export declare const GameIds: {
    SeDieMultiplayer: number;
};
export declare const LobbyGameId = 0;
export declare const SwiperNoSwiping = "swiper-no-swiping";
export declare const TimeOutConstants: {
    LoadingSpinner: number;
    OverlayMask: number;
};
