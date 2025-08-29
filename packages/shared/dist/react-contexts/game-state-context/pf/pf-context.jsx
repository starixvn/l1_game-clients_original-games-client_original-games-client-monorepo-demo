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
import { initialPFContextModel } from "./pf-context-model";
import { PFEventActionType } from "./pf-action";
import { localStorageKeys, StorageHelper } from "../../../helpers";
export var PFContext = createContext({});
var PFDispatchContext = createContext(null);
export function PFProvider(_a) {
    var children = _a.children, gameId = _a.gameId, uid = _a.uid;
    var _b = useReducer(pfReducer, initialPFContextModel({ gameId: gameId, uid: uid })), pfContextModel = _b[0], dispatch = _b[1];
    return (<PFContext.Provider value={pfContextModel}>
            <PFDispatchContext.Provider value={dispatch}>
                {children}
            </PFDispatchContext.Provider>
        </PFContext.Provider>);
}
export var usePFContext = function () {
    return useContext(PFContext);
};
export function usePFDispatch() {
    return useContext(PFDispatchContext);
}
function pfReducer(state, action) {
    var type = action.type, payload = action.payload;
    var pfClientSeedSetting = payload.pfClientSeedSetting, isShowPFVerify = payload.isShowPFVerify, isShowPFSetting = payload.isShowPFSetting, pfVerifyModalData = payload.pfVerifyModalData, isShowPFClientSeedInfo = payload.isShowPFClientSeedInfo, isShowPFVerification = payload.isShowPFVerification, ownBets = payload.ownBets;
    var newState = null;
    switch (type) {
        case PFEventActionType.UPDATE_PF_CLIENT_SEED_SETTING:
            var newPfClientSeedSetting = __assign(__assign({}, state.pfClientSeedSetting), pfClientSeedSetting);
            StorageHelper.set("".concat(localStorageKeys.pfSetting, "-").concat(state.uid, "-").concat(state.gameId), newPfClientSeedSetting);
            newState = { pfClientSeedSetting: newPfClientSeedSetting };
            break;
        case PFEventActionType.TOGGLE_PF_VERIFY:
            newState = { isShowPFVerify: isShowPFVerify };
            break;
        case PFEventActionType.TOGGLE_PF_SETTING:
            StorageHelper.set("".concat(localStorageKeys.showPFSetting), isShowPFSetting ? "".concat(state.uid, "-").concat(state.gameId) : "");
            newState = { isShowPFSetting: isShowPFSetting };
            break;
        case PFEventActionType.UPDATE_PF_VERIFY:
            newState = { pfVerifyModalData: pfVerifyModalData };
            break;
        case PFEventActionType.TOGGLE_PF_CLIENT_SEED_INFO:
            newState = { isShowPFClientSeedInfo: isShowPFClientSeedInfo };
            break;
        case PFEventActionType.TOGGLE_PF_VERIFICATION:
            newState = { isShowPFVerification: isShowPFVerification };
            break;
        case PFEventActionType.OWN_BETS:
            newState = { ownBets: ownBets };
            break;
        case PFEventActionType.SET_NEW_GAME_STATE:
            newState = { ownBets: {} };
            break;
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
    return __assign(__assign({}, state), newState);
}
