var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var convertToGMT8 = function (date) {
    return new Date(date.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
    }));
};
export var formatDate = function (date, template) {
    try {
        var z = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
        };
        template = template.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2);
        });
        return template.replace(/(y+)/g, function (v) {
            return date.getFullYear().toString().slice(-v.length);
        });
    }
    catch (ex) {
        return date.toString();
    }
};
export function sortedCollectionByTime(elements, decrease) {
    if (decrease === void 0) { decrease = true; }
    var newElements = elements === null || elements === void 0 ? void 0 : elements.map(function (item) {
        return __assign(__assign({}, item), { time: new Date(item.time) });
    });
    newElements === null || newElements === void 0 ? void 0 : newElements.sort(function (a, b) {
        return decrease ? b.time - a.time : a.time - b.time;
    });
    return newElements;
}
// Helper function to normalize input to Date object
function normalizeToDate(rawTime) {
    if (rawTime instanceof Date) {
        return rawTime;
    }
    if (typeof rawTime === "number") {
        // Heuristic: treat 13+ digit numbers as ms, 10-digit as seconds
        var asMs = rawTime > 1e12 ? rawTime : rawTime * 1000;
        return new Date(asMs);
    }
    if (typeof rawTime === "string") {
        var parsedFromString = new Date(rawTime);
        if (!Number.isNaN(parsedFromString.getTime())) {
            return parsedFromString;
        }
        // Try numeric string fallback (seconds or milliseconds)
        var numeric = Number(rawTime);
        if (!Number.isNaN(numeric)) {
            var asMs = numeric > 1e12 ? numeric : numeric * 1000;
            return new Date(asMs);
        }
    }
    return null;
}
// Helper function to format date and time
function formatDateTime(dateObject, dateFormatLocale, timeFormatLocale) {
    var dateFormat = new Intl.DateTimeFormat(dateFormatLocale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
    });
    var timeFormat = new Intl.DateTimeFormat(timeFormatLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    var date = dateFormat.format(dateObject);
    var time = timeFormat.format(dateObject);
    return { date: date, time: time };
}
export function separateDateTime(rawTime, dateFormatLocale, timeFormatLocale) {
    if (dateFormatLocale === void 0) { dateFormatLocale = "id"; }
    if (timeFormatLocale === void 0) { timeFormatLocale = "en-US"; }
    // Normalize input to a valid Date instance
    var dateObject = normalizeToDate(rawTime);
    if (!dateObject || Number.isNaN(dateObject.getTime())) {
        return { date: "-", time: "-" };
    }
    return formatDateTime(dateObject, dateFormatLocale, timeFormatLocale);
}
