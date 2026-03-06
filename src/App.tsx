import React, { useState, useEffect } from 'react';
import { PaperCard } from './components/PaperCard';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { DarkModeToggle } from './components/DarkModeToggle';
import { InfoPopup } from './components/InfoPopup';
import { parseCSV, getAllCategories, filterPapers } from './utils/csvParser';
import { getCategoryColors } from './utils/categoryColors';
import type { ResearchPaper, FilterState } from './types';
import './index.css';

export default function App() {
  // State
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [colorMap, setColorMap] = useState<Record<string, { bg: string; text: string; tag: string; border: string }>>({});
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    setIsDarkMode(
      savedDarkMode !== null ? JSON.parse(savedDarkMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Load and parse CSV file
  useEffect(() => {
    const loadCSV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/thrive_review.csv');
        if (!response.ok) throw new Error('Failed to load CSV file');
        const blob = await response.blob();
        const file = new File([blob], 'thrive_review.csv');
        const parsedPapers = await parseCSV(file);
        setPapers(parsedPapers);
        const allCategories = getAllCategories(parsedPapers);
        setCategories(allCategories);
        setColorMap(getCategoryColors(allCategories));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading the CSV');
      } finally {
        setIsLoading(false);
      }
    };

    loadCSV();
  }, []);

  const filteredPapers = filterPapers(papers, filters.searchQuery, filters.selectedCategories);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo_thrive.png" alt="THRIVE Logo" className="h-12 w-30 object-contain" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Literature Review
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Search and filter research papers by category
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Info button */}
              <button
                onClick={() => setIsInfoOpen(true)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Show project information"
                title="About this project"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Dark mode toggle */}
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            </div>
          </div>
        </div>
      </header>

      {/* Info popup modal */}
      <InfoPopup isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-8">
            Error: {error}
          </div>
        )}

        {/* Main content */}
        {!isLoading && !error && (
          <div className="space-y-8">
            {/* Filters panel */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Search
                </h3>
                <SearchBar
                  searchQuery={filters.searchQuery}
                  onSearchChange={(query) =>
                    setFilters({ ...filters, searchQuery: query })
                  }
                />
              </div>

              {/* Category filter */}
              <CategoryFilter
                categories={categories}
                selectedCategories={filters.selectedCategories}
                onCategoryChange={(cats) =>
                  setFilters({ ...filters, selectedCategories: cats })
                }
                colorMap={colorMap}
              />
            </div>

            {/* Results section */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredPapers.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{papers.length}</span> papers
                </p>
              </div>

              {/* Empty state */}
              {filteredPapers.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No papers found. Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPapers.map((paper, index) => (
                    <PaperCard key={index} paper={paper} colorMap={colorMap} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
