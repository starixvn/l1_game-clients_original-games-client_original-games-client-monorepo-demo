export var objectMap = function (obj, fn) {
    return Object.fromEntries(Object.entries(obj).map(function (_a, i) {
        var k = _a[0], v = _a[1];
        return [k, fn(v, k, i)];
    }));
};
