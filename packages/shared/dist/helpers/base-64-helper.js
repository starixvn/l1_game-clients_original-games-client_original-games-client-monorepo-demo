import { Base64 } from "base64-string";
import isNull from "lodash/isNull";
var GameUtils = /** @class */ (function () {
    function GameUtils() {
    }
    GameUtils.base64Decode = function (data) {
        if (isNull(data)) {
            return "";
        }
        if (!GameUtils.base64) {
            GameUtils.base64 = new Base64();
        }
        return GameUtils.base64.decode(data);
    };
    GameUtils.base64Encode = function (data) {
        if (isNull(data)) {
            return "";
        }
        if (!GameUtils.base64) {
            GameUtils.base64 = new Base64();
        }
        return GameUtils.base64.encode(data);
    };
    return GameUtils;
}());
export { GameUtils };
