import { StateCreator } from "zustand";
import { PFClientSeedSetting } from '@shared/components/game-base/type";
export interface PFSettingsSlice {
    isShowPFSetting: boolean;
    pfClientSeedSetting: PFClientSeedSetting;
    serverSeedHash: string;
    expandGuideFirst: boolean;
    gameId: number;
    uid: number;
    togglePFSetting: (isShow: boolean) => void;
    updatePFClientSeedSetting: (setting: Partial<PFClientSeedSetting>) => void;
    updateServerSeedHash: (hash: string) => void;
    toggleExpandGuideFirst: (isExpand: boolean) => void;
    initializePFSettings: (gameId: number, uid: number) => void;
}
export declare const createPFSettingsSlice: StateCreator<PFSettingsSlice>;
