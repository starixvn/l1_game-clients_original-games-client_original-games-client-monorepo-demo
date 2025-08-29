import { StateCreator } from "zustand";
export interface PopupSlice {
    isShowBetHistory: boolean;
    isShowBetDetail: boolean;
    isShowGameGuide: boolean;
    isShowPFSetting: boolean;
    isShowPFVerify: boolean;
    isShowPFClientSeedInfo: boolean;
    isShowPFVerification: boolean;
    expandGuideFirst: boolean;
    togglePFVerify: (isShow: boolean) => void;
    togglePFClientSeedInfo: (isShow: boolean) => void;
    togglePFVerification: (isShow: boolean) => void;
    toggleBetHistory: (isShow: boolean) => void;
    toggleBetDetail: (isShow: boolean) => void;
    toggleGameGuide: (isShow: boolean) => void;
    togglePFSetting: (isShow: boolean) => void;
    toggleExpandGuideFirst: (isExpand: boolean) => void;
}
export declare const createPopupSlice: StateCreator<PopupSlice>;
