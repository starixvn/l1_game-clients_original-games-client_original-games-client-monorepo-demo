export var addMultipleEventListeners = function (element, events, handler, options) {
    events.forEach(function (event) { return element.addEventListener(event, handler, options); });
    return function () {
        events.forEach(function (event) { return element.removeEventListener(event, handler, options); });
    };
};
