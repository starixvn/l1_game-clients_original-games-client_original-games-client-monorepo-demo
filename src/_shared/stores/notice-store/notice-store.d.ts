import { NoticeSlice } from "./notice-slice";
export type NoticeStore = NoticeSlice;
export declare const useNoticeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NoticeSlice>>;
export default useNoticeStore;
