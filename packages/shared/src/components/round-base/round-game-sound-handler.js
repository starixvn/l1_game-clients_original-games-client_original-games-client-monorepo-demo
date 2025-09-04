import { RoundState } from "../game-base/type";
var RoundGameSoundHandler = /** @class */ (function () {
    function RoundGameSoundHandler(props) {
        this.props = props;
    }
    RoundGameSoundHandler.prototype.handleSound = function (newRoundState) {
        var _a;
        var _b = this.props.gameSound(), startPlaceBetSound = _b.startPlaceBetSound, startRoundSound = _b.startRoundSound;
        var soundByState = (_a = {},
            _a[RoundState.BeforePlaceBet] = startRoundSound,
            _a[RoundState.InRound] = startPlaceBetSound,
            _a);
        var fn = soundByState[newRoundState];
        if (fn) {
            fn();
        }
    };
    return RoundGameSoundHandler;
}());
export { RoundGameSoundHandler };
