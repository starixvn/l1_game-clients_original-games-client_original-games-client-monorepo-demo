var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createContext, useContext, useReducer } from "react";
import { StorageHelper, localStorageKeys } from "../../helpers";
import { initialSettingContextModel } from "./setting-context-model";
import { SettingEventActionType } from "./setting-event-action";
export var SettingContext = createContext({});
export var SettingDispatchContext = createContext(null);
SettingContext.displayName = "SettingContext";
export var SettingContextProvider = function (_a) {
    var _b, _c, _d;
    var children = _a.children;
    var _e = useReducer(settingReducer, initialSettingContextModel()), settingContextModel = _e[0], dispatch = _e[1];
    settingContextModel.enabledMusic = (_b = StorageHelper.get(localStorageKeys.enableMusic)) !== null && _b !== void 0 ? _b : true;
    settingContextModel.volumeMusic = (_c = StorageHelper.get(localStorageKeys.volumeMusic)) !== null && _c !== void 0 ? _c : 50;
    settingContextModel.volumeSFX = (_d = StorageHelper.get(localStorageKeys.volumeSFX)) !== null && _d !== void 0 ? _d : 50;
    return (<SettingContext.Provider value={settingContextModel}>
            <SettingDispatchContext.Provider value={dispatch}>{children}</SettingDispatchContext.Provider>
        </SettingContext.Provider>);
};
export var useSettingContext = function () { return useContext(SettingContext); };
export var useSettingDispatch = function () { return useContext(SettingDispatchContext); };
var settingReducer = function (state, action) {
    var type = action.type, payload = action.payload;
    var isShowedSetting = payload.isShowedSetting, enabledMusic = payload.enabledMusic, enabledSound = payload.enabledSound, isShowAvatarGallery = payload.isShowAvatarGallery, chipSettings = payload.chipSettings, volumeMusic = payload.volumeMusic, volumeSFX = payload.volumeSFX;
    switch (type) {
        case SettingEventActionType.TOGGLE_SETTING: {
            return __assign(__assign({}, state), { isShowedSetting: isShowedSetting });
        }
        case SettingEventActionType.TOGGLE_MUSIC: {
            return __assign(__assign({}, state), { enabledMusic: enabledMusic });
        }
        case SettingEventActionType.TOGGLE_SOUND: {
            return __assign(__assign({}, state), { enabledSound: enabledSound });
        }
        case SettingEventActionType.SHOW_AVATAR_GALLERY: {
            return __assign(__assign({}, state), { isShowAvatarGallery: isShowAvatarGallery });
        }
        case SettingEventActionType.UPDATE_CHIPS: {
            return __assign(__assign({}, state), { chipSettings: chipSettings });
        }
        case SettingEventActionType.UPDATE_VOLUME_MUSIC: {
            return __assign(__assign({}, state), { volumeMusic: volumeMusic });
        }
        case SettingEventActionType.UPDATE_VOLUME_SFX: {
            return __assign(__assign({}, state), { volumeSFX: volumeSFX });
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
