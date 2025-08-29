export var createPFVerificationSlice = function (set) { return ({
    pfVerifyModalData: null,
    updatePFVerify: function (data) { return set({ pfVerifyModalData: data }); },
}); };
