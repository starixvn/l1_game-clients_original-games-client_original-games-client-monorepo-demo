import { useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store/theme-store';
import { Themes } from '../constants';
export var useAppTheme = function () {
    var _a = useThemeStore(), currentTheme = _a.currentTheme, isDark = _a.isDark, setTheme = _a.setTheme, toggleTheme = _a.toggleTheme;
    useEffect(function () {
        if (typeof window !== 'undefined') {
            var savedTheme = localStorage.getItem('theme');
            if (savedTheme && (savedTheme === Themes.light || savedTheme === Themes.dark)) {
                setTheme(savedTheme);
            }
            else {
                document.documentElement.style.colorScheme = Themes.dark;
            }
        }
    }, [setTheme]);
    useEffect(function () {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', currentTheme);
            document.documentElement.style.colorScheme = currentTheme;
            localStorage.setItem('theme', currentTheme);
        }
    }, [currentTheme]);
    var handleSetTheme = function (theme) {
        setTheme(theme);
    };
    return {
        currentTheme: currentTheme,
        isDark: isDark,
        setTheme: handleSetTheme,
        toggleTheme: toggleTheme,
    };
};
