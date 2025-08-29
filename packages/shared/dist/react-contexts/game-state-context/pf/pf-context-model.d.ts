import { PFClientSeedSetting, PFResult } from "../../../../components/game-base/type";
export interface PFContextModel {
    isShowPFSetting: boolean;
    isShowPFVerify: boolean;
    isShowPFClientSeedInfo: boolean;
    isShowPFVerification: boolean;
    pfClientSeedSetting?: PFClientSeedSetting;
    pfVerifyModalData?: PFResult;
    ownBets?: any;
    gameId: number;
    uid: number;
}
export declare const initialPFContextModel: ({ gameId, uid }: {
    gameId: any;
    uid: any;
}) => PFContextModel;
