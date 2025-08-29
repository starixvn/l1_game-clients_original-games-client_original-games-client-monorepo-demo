import useSound from "use-sound";
import { buildVersion } from "../constants";
import { StorageHelper, formatVolume, localStorageKeys, objectMap } from "../helpers";
import { useSettingContext } from "../react-contexts";
export var path = "./static/sounds/";
var mp3File = {
    placeBet: "place-bet",
    click: "click",
    selectChip: "select-chip",
    startingRound: "starting-round",
    startingDraw: "starting-draw",
    showBallResult: "show-ball-result",
    blockBet: "block-bet",
};
var resourceMp3 = objectMap(mp3File, function (v) { return "".concat(path).concat(v, ".mp3?v=").concat(buildVersion); });
export var usePlaySound = function (resource) {
    var _a = useSound(resource, {}), playSound = _a[0], ctx = _a[1].sound;
    var settingContext = useSettingContext();
    return function () {
        var _a;
        if (document.visibilityState === "visible" && ctx) {
            var enable = (_a = StorageHelper.get(localStorageKeys.enableSound)) !== null && _a !== void 0 ? _a : true;
            ctx.volume(formatVolume(settingContext.volumeSFX));
            settingContext.volumeSFX && enable && playSound();
        }
    };
};
export var useClickSound = function () {
    return usePlaySound(resourceMp3.click);
};
export var useSelectChipSound = function () {
    return usePlaySound(resourceMp3.selectChip);
};
export var usePlaceBetSound = function () {
    return usePlaySound(resourceMp3.placeBet);
};
export var useStartDrawSound = function () {
    return usePlaySound(resourceMp3.startingDraw);
};
export var useStartRoundSound = function () {
    return usePlaySound(resourceMp3.startingRound);
};
export var useShowBallResultSound = function () {
    return usePlaySound(resourceMp3.showBallResult);
};
export var useBlockBetSound = function () {
    return usePlaySound(resourceMp3.blockBet);
};
