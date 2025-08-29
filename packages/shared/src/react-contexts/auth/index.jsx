import React from "react";
import { locales } from "../../constants";
export var PlayerContext = React.createContext({
    locale: locales.en,
    enableQuickBet: true
});
PlayerContext.displayName = "AuthContext";
export var PlayerContextProvider = PlayerContext.Provider;
export var PlayerContextConsumer = PlayerContext.Consumer;
export var usePlayerContext = function () { return React.useContext(PlayerContext); };
