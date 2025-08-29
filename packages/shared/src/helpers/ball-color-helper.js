var BallColor;
(function (BallColor) {
    BallColor["BLUE"] = "blue";
    BallColor["RED"] = "red";
})(BallColor || (BallColor = {}));
export var getBallColor = function (index) {
    return index % 2 === 0 ? BallColor.RED : BallColor.BLUE;
};
