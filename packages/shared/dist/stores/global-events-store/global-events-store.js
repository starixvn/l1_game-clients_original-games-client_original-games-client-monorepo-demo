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
import { create } from "zustand";
import { createGlobalEventsSlice } from "./global-events-slice";
export var useGlobalEventsStore = create()(function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var globalEventsSlice = createGlobalEventsSlice.apply(void 0, a);
    return __assign({}, globalEventsSlice);
});
export default useGlobalEventsStore;
