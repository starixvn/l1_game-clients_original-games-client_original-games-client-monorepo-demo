import { isKickOutError, broadcastNotice, createNoticeFromErrorCode } from "../../../_shared/helpers";
import { messageEventType } from "./game-message-handler";
var GameErrorHandler = /** @class */ (function () {
    function GameErrorHandler(props) {
        var _this = this;
        this.props = props;
        this.registerEvents = function (signOut) {
            _this.props.gameMessageHandler.register(messageEventType.API_ERROR, function (_a) {
                var apiError = _a.apiError;
                _this.handleApiError(apiError, signOut);
            });
        };
        this.handleApiError = function (apiError, signOut) {
            var errorCode = apiError.errorCode;
            var isKickOut = isKickOutError(errorCode);
            var onClose = isKickOut ? signOut : null;
            var duration = isKickOut ? 10 : 3;
            var notice = createNoticeFromErrorCode(errorCode, {
                gameName: _this.props.gamName,
                roundId: apiError === null || apiError === void 0 ? void 0 : apiError.gameRoundId,
                minBet: apiError === null || apiError === void 0 ? void 0 : apiError.minBet,
                maxBet: apiError === null || apiError === void 0 ? void 0 : apiError.maxBet,
                onClose: onClose,
                duration: duration,
                isWarning: false
            });
            broadcastNotice(notice);
        };
    }
    return GameErrorHandler;
}());
export { GameErrorHandler };
