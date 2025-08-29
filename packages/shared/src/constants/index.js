var _a;
import { getAppSettings } from "../app-settings";
export var systemName = getAppSettings().system.toLocaleLowerCase();
export var locales = { en: "en", vi: "vi", th: "th", id: "id", zh_cn: "zh_cn", zh_tw: "zh_tw", ja: "ja" };
export var languageMapper = {
    "en-US": "en",
    "vi-VN": "vi",
    "th-TH": "th",
    "id-ID": "id",
    "zh-CN": "zh_cn",
    "zh-TW": "zh_tw",
    "ja-JP": "ja",
};
export var LanguageLocaleMapper = {
    en: "en-US",
    vi: "vi-VN",
    th: "th-TH",
    id: "id-ID",
    zh_cn: "zh-CN",
    zh_tw: "zh-TW",
    ja: "ja-JP",
};
export var languageNameMapper = { en: "English", vi: "Tiếng Việt" };
export var Themes = {
    dark: "dark",
    light: "light",
    numberGame: "number-game",
};
export var sabaNumberName = "Saba.numbers";
export var sabaClubName = "Saba.games";
export var buildVersion = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.buildVersion) || 111;
export var AppTypes = {
    mobile: 1,
};
export var confirmBet = "confirmBet";
export var GameIds = {
    SeDieMultiplayer: 148,
};
export var LobbyGameId = 0;
export var SwiperNoSwiping = "swiper-no-swiping";
export var TimeOutConstants = {
    LoadingSpinner: 3000,
    OverlayMask: 3000,
};
