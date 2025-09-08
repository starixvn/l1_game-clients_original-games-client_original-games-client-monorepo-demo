import { DrawInfo } from '@shared/components/game-base/type";
export interface BetDetailData {
    drawInfo: DrawInfo;
    betLogDetails: any[];
}
export interface BetDetailStore {
    betDetailData: BetDetailData | null;
    updateBetDetail: (betDetailData: BetDetailData) => void;
}
export declare const useBetDetailStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BetDetailStore>>;
export default useBetDetailStore;
