import { StateCreator } from "zustand";
import { NoticeModel } from "../../../components/game-base/type";
export interface NoticeSlice {
    notice: NoticeModel | null;
    setNotice: (notice: NoticeModel | null) => void;
    clearNotice: () => void;
    showNotice: (notice: NoticeModel) => void;
}
export declare const createNoticeSlice: StateCreator<NoticeSlice>;
