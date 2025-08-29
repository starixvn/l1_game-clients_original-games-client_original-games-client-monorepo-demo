import React, { useContext } from "react";
var GameActionsContext = React.createContext({});
GameActionsContext.displayName = "GameActionsContext";
export var GameActionsContextProvider = GameActionsContext.Provider;
export var GameActionsContextConsumer = GameActionsContext.Consumer;
export var useGameActionContext = function () { return useContext(GameActionsContext); };
