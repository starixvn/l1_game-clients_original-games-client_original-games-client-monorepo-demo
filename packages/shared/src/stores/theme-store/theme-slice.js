import { Themes } from "../../constants";
export var createThemeSlice = function (set, get) { return ({
    currentTheme: Themes.dark,
    isDark: true,
    setTheme: function (theme) {
        if (theme === Themes.light || theme === Themes.dark) {
            set({
                currentTheme: theme,
                isDark: theme === Themes.dark
            });
        }
    },
    toggleTheme: function () {
        var currentTheme = get().currentTheme;
        var newTheme = currentTheme === Themes.light ? Themes.dark : Themes.light;
        get().setTheme(newTheme);
    },
}); };
