import { NoticeModel } from '@shared/components/game-base/type";
export interface INotice {
    errorCode: string;
    hedgeBetGroup?: string[];
    minBet?: number;
    maxBet?: number;
    gameRoundId?: number;
    gameTypeId?: number;
    isPlaceBetFailed?: boolean;
}
export declare const GetLocalizedErrorMessage: (errorCode: string, isPlaceBet?: boolean) => any;
export declare const broadcastNotice: (notice: NoticeModel | null) => void;
export interface CreateNoticeOptions {
    gameName?: string;
    roundId?: number;
    minBet?: number;
    maxBet?: number;
    onClose?: () => void;
    duration?: number;
    isWarning?: boolean;
    hedgeBetGroup?: string[];
    adjustBetNoticePosition?: boolean;
}
export declare const createNoticeFromErrorCode: (errorCode: string, options?: CreateNoticeOptions) => NoticeModel;
export declare const createOptionForHedgeBetGroup: (hedgeBetGroup: string[], tolgeeNamespace: any) => {};
export declare const getGlossaryTranslate: (ns: string, key: string) => string;
export declare const isKickOutError: (errorCode: string) => boolean;
export declare const getExtendMessageByErrorCode: (errorCode: string) => string;
export declare const getNotice: (errorCode: string, adjustBetNoticePosition?: boolean, gameName?: string, betChoice1?: string, betChoice2?: string, args?: object) => NoticeModel;
