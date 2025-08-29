export var createNoticeSlice = function (set) { return ({
    notice: null,
    setNotice: function (notice) { return set({ notice: notice }); },
    clearNotice: function () { return set({ notice: null }); },
    showNotice: function (notice) { return set({ notice: notice }); },
}); };
