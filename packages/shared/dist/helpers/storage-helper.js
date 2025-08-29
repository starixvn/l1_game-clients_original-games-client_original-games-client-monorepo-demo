import { getAppSettings } from "../app-settings";
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.remove = function (name) {
        localStorage.removeItem(name);
    };
    LocalStorage.prototype.get = function (name) {
        var storage = localStorage.getItem(name);
        if (!storage) {
            return null;
        }
        try {
            return JSON.parse(storage);
        }
        catch (error) {
            return null;
        }
    };
    LocalStorage.prototype.set = function (name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    };
    LocalStorage.prototype.isAvailable = function () {
        var test = "test storage";
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return LocalStorage;
}());
export { LocalStorage };
var Memory = /** @class */ (function () {
    function Memory() {
        globalThis.localMemory = {};
        this.localMemory = globalThis.localMemory;
    }
    Memory.prototype.remove = function (name) {
        delete this.localMemory[name];
    };
    Memory.prototype.get = function (name) {
        return this.localMemory[name] ? this.localMemory[name] : null;
    };
    Memory.prototype.set = function (name, value) {
        this.localMemory[name] = value;
    };
    Memory.prototype.isAvailable = function () {
        return true;
    };
    return Memory;
}());
export { Memory };
var StorageHelper = /** @class */ (function () {
    function StorageHelper() {
    }
    StorageHelper.initialize = function () {
        if (!StorageHelper.supportStorage) {
            var allStorage = [new LocalStorage(), new Memory()];
            StorageHelper.supportStorage = allStorage.filter(function (storage) { return storage.isAvailable(); })[0];
            // Cleanup deprecated latest-game-id key (global key only)
            try {
                StorageHelper.supportStorage.remove(buildLocalStorageKey("latest-game-id"));
            }
            catch (_) {
                // ignore
            }
        }
    };
    StorageHelper.getCurrentStorage = function () {
        StorageHelper.initialize();
        return StorageHelper.supportStorage;
    };
    StorageHelper.get = function (name) {
        return StorageHelper.getCurrentStorage().get(StorageHelper.getName(name));
    };
    StorageHelper.set = function (name, value) {
        StorageHelper.getCurrentStorage().set(StorageHelper.getName(name), value);
    };
    StorageHelper.remove = function (name) {
        StorageHelper.getCurrentStorage().remove(StorageHelper.getName(name));
    };
    StorageHelper.setPrefixKey = function (prefixKey) {
        StorageHelper.prefixKey = prefixKey;
    };
    StorageHelper.getName = function (name) {
        return StorageHelper.prefixKey ? "".concat(StorageHelper.prefixKey, "_").concat(name) : name;
    };
    return StorageHelper;
}());
export { StorageHelper };
// Define a constant for the duplicated literal
var LATEST_GAME_ID_KEY = "latest-game-id";
export var localStorageKeys = {
    session: buildLocalStorageKey("auth-data"),
    rebet: buildLocalStorageKey("rebet"),
    umInfo: buildLocalStorageKey("um_info"),
    loginStatus: buildLocalStorageKey("login-status"),
    enableSound: buildLocalStorageKey("enable-sound"),
    enableMusic: buildLocalStorageKey("enable-music"),
    buildVersion: buildLocalStorageKey("build-version"),
    pfSetting: buildLocalStorageKey("pf-setting"),
    debug: buildLocalStorageKey("debug"),
    url: buildLocalStorageKey("url"),
    hideToolbarGuide: buildLocalStorageKey("hideToolbarGuide"),
    currentSessionHideToolbarGuide: buildLocalStorageKey("currentSessionHideToolbarGuide"),
    hideSwitchGameGuide: buildLocalStorageKey("hideSwitchGameGuide"),
    currentSessionSwitchGameGuide: buildLocalStorageKey("currentSessionSwitchGameGuide"),
    showPFSetting: buildLocalStorageKey("show-pf-setting"),
    isSleepMode: buildLocalStorageKey("is-sleep-mode"),
    volumeMusic: buildLocalStorageKey("volume-music"),
    volumeSFX: buildLocalStorageKey("volume-SFX"),
    pfStore: buildLocalStorageKey("pf-store"),
    // latestGameId is deprecated due to one-game-per-session behavior
    latestGameId: buildLocalStorageKey(LATEST_GAME_ID_KEY),
    // User-specific latestGameId is deprecated and kept only for backward-compat mocks
    userLatestGameId: LATEST_GAME_ID_KEY,
};
export function buildLocalStorageKey(key) {
    if (typeof globalThis !== "undefined" && globalThis.location && globalThis.location.hostname) {
        return "".concat(globalThis.location.hostname, ".").concat(key, ".").concat(getAppSettings().appType);
    }
    return key;
}
export function buildUserSpecificLocalStorageKey(key, username) {
    var baseKey = buildLocalStorageKey(key);
    if (username) {
        return "".concat(baseKey, ".").concat(username);
    }
    return baseKey;
}
export function getUserLatestGameId(_username) {
    // Disabled: do not persist or read latest-game-id anymore
    return 0;
}
export function setUserLatestGameId(_gameId, _username) {
    // Disabled: no-op per one-game-per-session behavior
}
