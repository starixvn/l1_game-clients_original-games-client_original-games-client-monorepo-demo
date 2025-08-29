import { isAndroid, isIOS, osVersion } from "react-device-detect";
export var useLowPerformanceDevice = function () {
    var isLowPerformanceIOS = isIOS && +osVersion < 17;
    return isAndroid || isLowPerformanceIOS;
};
