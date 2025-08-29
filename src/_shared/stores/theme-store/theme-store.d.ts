import { ThemeSlice } from "./theme-slice";
export type ThemeStore = ThemeSlice;
export declare const useThemeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ThemeSlice>>;
export default useThemeStore;
