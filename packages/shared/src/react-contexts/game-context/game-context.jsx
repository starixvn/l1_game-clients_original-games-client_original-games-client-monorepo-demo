import React, { useContext } from "react";
export var GameContext = React.createContext({});
GameContext.displayName = "GameContext";
export var GameContextProvider = GameContext.Provider;
export var GameContextConsumer = GameContext.Consumer;
export var useGameContext = function () { return useContext(GameContext); };
