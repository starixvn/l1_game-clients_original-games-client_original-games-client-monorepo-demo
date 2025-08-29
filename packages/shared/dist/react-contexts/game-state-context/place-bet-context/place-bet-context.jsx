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
import { PlaceBetEventActionType } from "./place-bet-action";
import { initialPlaceBetContext } from "./place-bet-context-model";
export var PlaceBetContext = createContext({});
var PlaceBetDispatchContext = createContext({});
export function PlaceBetProvider(_a) {
    var children = _a.children;
    var _b = useReducer(placeBetReducer, initialPlaceBetContext()), placeBetContextModel = _b[0], dispatch = _b[1];
    return (<PlaceBetContext.Provider value={placeBetContextModel}>
            <PlaceBetDispatchContext.Provider value={dispatch}>{children}</PlaceBetDispatchContext.Provider>
        </PlaceBetContext.Provider>);
}
export var usePlaceBetContext = function () {
    return useContext(PlaceBetContext);
};
export function usePlaceBetDispatch() {
    return useContext(PlaceBetDispatchContext);
}
function placeBetReducer(state, action) {
    var type = action.type, payload = action.payload;
    var ownBets = payload.ownBets, suggestBet = payload.suggestBet, notConfirmOwnBets = payload.notConfirmOwnBets, showConfirmBet = payload.showConfirmBet, showConfirmDialog = payload.showConfirmDialog;
    switch (type) {
        case PlaceBetEventActionType.OWN_BETS: {
            return __assign(__assign({}, state), { ownBets: ownBets });
        }
        case PlaceBetEventActionType.SUGGEST_BET: {
            return __assign(__assign({}, state), { suggestBet: suggestBet });
        }
        case PlaceBetEventActionType.RESET_OWN_BETS_AND_SUGGEST_BET: {
            return __assign(__assign({}, state), { ownBets: {}, suggestBet: {} });
        }
        case PlaceBetEventActionType.CLOSE_ALL_DIALOGS: {
            return __assign(__assign({}, state), { notConfirmOwnBets: {}, showConfirmBet: false, showConfirmDialog: false });
        }
        case PlaceBetEventActionType.NOT_CONFIRM_OWN_BETS: {
            return __assign(__assign({}, state), { notConfirmOwnBets: notConfirmOwnBets });
        }
        case PlaceBetEventActionType.SHOW_CONFIRM_BET: {
            return __assign(__assign({}, state), { showConfirmBet: showConfirmBet });
        }
        case PlaceBetEventActionType.SHOW_CONFIRM_DIALOG: {
            return __assign(__assign({}, state), { showConfirmDialog: showConfirmDialog });
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}
