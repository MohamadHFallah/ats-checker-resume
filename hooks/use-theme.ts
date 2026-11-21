import { useEffect, useState } from "react";

export const useThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    function toggleTheme() {
        const darkMode = !isDarkMode;
        setIsDarkMode(darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }

    return { toggleTheme, isDarkMode }
}