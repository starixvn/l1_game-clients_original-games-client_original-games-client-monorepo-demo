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
import { createContext, useContext, useReducer } from "react";
import { initialSystemContextModel } from "./system-context-model";
import { SystemEventActionType } from "./system-event-action";
export var SystemContext = createContext({});
export var SystemDispatchContext = createContext(null);
SystemContext.displayName = "SystemContext";
export var SystemContextProvider = function (_a) {
    var children = _a.children;
    var _b = useReducer(systemReducer, initialSystemContextModel()), gameStateContextModel = _b[0], dispatch = _b[1];
    return (<SystemContext.Provider value={gameStateContextModel}>
            <SystemDispatchContext.Provider value={dispatch}>{children}</SystemDispatchContext.Provider>
        </SystemContext.Provider>);
};
export var useSystemContext = function () { return useContext(SystemContext); };
export var useSystemDispatch = function () { return useContext(SystemDispatchContext); };
var systemReducer = function (state, action) {
    var type = action.type, payload = action.payload;
    var selectedChip = payload.selectedChip, isEnableQuickBet = payload.isEnableQuickBet;
    switch (type) {
        case SystemEventActionType.SELECT_CHIP: {
            return __assign(__assign({}, state), { selectedChip: selectedChip });
        }
        case SystemEventActionType.SET_QUICK_BET: {
            return __assign(__assign({}, state), { isEnableQuickBet: isEnableQuickBet });
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
