import React from 'react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        // Moon icon (dark mode)
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.5 1.5H9.5V.5h1v1zM4.222 2.808l-.707-.707.707-.707.707.707-.707.707zm11.556 0l.707-.707-.707-.707-.707.707.707.707zM1.5 9.5H.5v1h1v-1zm17 0h-1v1h1v-1zM4.222 17.192l-.707.707.707.707.707-.707-.707-.707zm11.556 0l.707.707-.707.707-.707-.707.707-.707zM10.5 19.5h-1v1h1v-1z" />
          <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
      ) : (
        // Sun icon (light mode)
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};
