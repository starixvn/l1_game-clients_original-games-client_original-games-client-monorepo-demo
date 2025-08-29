// Simple scoreboard registry for custom version without lobby
export var registerBigRoadElement = function (element, converter) {
    var gameIds = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        gameIds[_i - 2] = arguments[_i];
    }
    console.log("[ScoreboardRegistry] registerBigRoadElement called with:", { element: !!element, converter: !!converter, gameIds: gameIds });
};
