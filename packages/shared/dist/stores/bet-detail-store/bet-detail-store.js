import { create } from "zustand";
export var useBetDetailStore = create(function (set) { return ({
    betDetailData: null,
    updateBetDetail: function (betDetailData) { return set({ betDetailData: betDetailData }); },
}); });
export default useBetDetailStore;
