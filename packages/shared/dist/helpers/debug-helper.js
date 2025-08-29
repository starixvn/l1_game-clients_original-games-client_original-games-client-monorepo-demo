import { StorageHelper, localStorageKeys } from "./storage-helper";
import { getAppSettings } from "../app-settings";
export var writeDebugLog = function (data) {
    if (getAppSettings().enableDebugLogs && StorageHelper.get(localStorageKeys.debug) === true) {
        console.log(JSON.stringify(data), new Date().toLocaleTimeString());
    }
};
