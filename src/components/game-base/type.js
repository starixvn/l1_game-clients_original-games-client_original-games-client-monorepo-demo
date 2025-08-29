export var RoundState;
(function (RoundState) {
    RoundState[RoundState["None"] = 0] = "None";
    RoundState[RoundState["Disabled"] = 1] = "Disabled";
    RoundState[RoundState["InRound"] = 2] = "InRound";
    RoundState[RoundState["LockingBet"] = 3] = "LockingBet";
    RoundState[RoundState["DisplayResult"] = 4] = "DisplayResult";
    RoundState[RoundState["BeforePlaceBet"] = 5] = "BeforePlaceBet";
    RoundState[RoundState["ConnectFailed"] = 6] = "ConnectFailed";
    RoundState[RoundState["SwitchRound"] = 7] = "SwitchRound";
})(RoundState || (RoundState = {}));
export var BallColor;
(function (BallColor) {
    BallColor["BLUE"] = "blue";
    BallColor["RED"] = "red";
})(BallColor || (BallColor = {}));
