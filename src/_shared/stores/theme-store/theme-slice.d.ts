import { StateCreator } from "zustand";
export interface ThemeSlice {
    currentTheme: string;
    isDark: boolean;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
}
export declare const createThemeSlice: StateCreator<ThemeSlice>;
