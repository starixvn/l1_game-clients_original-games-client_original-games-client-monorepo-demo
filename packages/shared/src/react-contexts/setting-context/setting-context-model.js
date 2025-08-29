import { StorageHelper, localStorageKeys } from "../../helpers";
export var initialSettingContextModel = function () {
    var _a, _b, _c, _d;
    return {
        isShowedSetting: false,
        enabledMusic: (_a = StorageHelper.get(localStorageKeys.enableMusic)) !== null && _a !== void 0 ? _a : true,
        enabledSound: (_b = StorageHelper.get(localStorageKeys.enableSound)) !== null && _b !== void 0 ? _b : true,
        isShowAvatarGallery: false,
        chipSettings: [],
        volumeMusic: (_c = StorageHelper.get(localStorageKeys.volumeMusic)) !== null && _c !== void 0 ? _c : 50,
        volumeSFX: (_d = StorageHelper.get(localStorageKeys.volumeSFX)) !== null && _d !== void 0 ? _d : 50,
    };
};
