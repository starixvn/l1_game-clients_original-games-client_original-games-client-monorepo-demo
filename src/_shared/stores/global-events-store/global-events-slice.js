export var createGlobalEventsSlice = function (set) { return ({
    openingGameId: 0,
    backToLobby: false,
    closeDialog: false,
    userInfoRed: null,
    avatarId: 0,
    setOpeningGameId: function (gameId) { return set({ openingGameId: gameId }); },
    setBackToLobby: function (backToLobby) { return set({ backToLobby: backToLobby }); },
    setCloseDialog: function (closeDialog) { return set({ closeDialog: closeDialog }); },
    setUserInfoRed: function (userInfo) { return set({ userInfoRed: userInfo }); },
    setAvatarId: function (avatarId) { return set({ avatarId: avatarId }); },
    broadcast: function (event) {
        if (event.openingGameId !== undefined) {
            set({ openingGameId: event.openingGameId });
        }
        if (event.backToLobby !== undefined) {
            set({ backToLobby: event.backToLobby });
        }
        if (event.closeDialog !== undefined) {
            set({ closeDialog: event.closeDialog });
        }
        if (event.userInfoRed !== undefined) {
            set({ userInfoRed: event.userInfoRed });
        }
        if (event.avatarId !== undefined) {
            set({ avatarId: event.avatarId });
        }
    },
}); };
