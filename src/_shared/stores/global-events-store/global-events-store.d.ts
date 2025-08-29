import { GlobalEventsSlice } from "./global-events-slice";
export type GlobalEventsStore = GlobalEventsSlice;
export declare const useGlobalEventsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GlobalEventsSlice>>;
export default useGlobalEventsStore;
