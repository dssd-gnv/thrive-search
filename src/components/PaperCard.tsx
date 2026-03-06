import React, { useState } from 'react';
import type { ResearchPaper } from '../types';

interface PaperCardProps {
  paper: ResearchPaper;
  colorMap: Record<string, { bg: string; text: string; tag: string; border: string }>;
}

type TabType = 'main' | 'problems' | 'solutions' | 'recommendations';

// Check if value is empty or placeholder
const isEmptyValue = (value: string): boolean => {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed === '' || trimmed === '-' || trimmed.toLowerCase() === 'n/a' || trimmed === 'NA';
};

// Paper card component with tabbed interface for different content sections
export const PaperCard: React.FC<PaperCardProps> = ({ paper, colorMap }) => {
  const [activeTab, setActiveTab] = useState<TabType>('main');

  // Click to open paper link
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).textContent?.includes('Click to open paper')) {
      if (paper.link && !isEmptyValue(paper.link)) {
        window.open(paper.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const cursorClass = !isEmptyValue(paper.link) ? 'cursor-pointer' : '';

  // Show tabs only for sections that have content
  const hasTabs = {
    problems: !isEmptyValue(paper.problems),
    solutions: !isEmptyValue(paper.solutions),
    recommendations: !isEmptyValue(paper.implement),
  };

  const tabCount = Object.values(hasTabs).filter(Boolean).length;

  return (
    // Card container, clickable if it has a link
    <div
      onClick={handleCardClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-200 hover:shadow-lg ${cursorClass}`}
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {paper.title}
        </h2>

        {!isEmptyValue(paper.authors) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="font-semibold">Authors:</span> {paper.authors}
          </p>
        )}

        {/* Color-coded tags */}
        {paper.thrive.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {paper.thrive.map((tag, index) => {
              const colors = colorMap[tag];
              return (
                <span
                  key={index}
                  className={`inline-block px-3 py-1 text-sm font-medium text-white ${colors.tag} rounded-full`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Tab navigation */}
      {tabCount > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 flex">
          {/* About tab */}
          <button
            onClick={() => setActiveTab('main')}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'main'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            About
          </button>

          {/* Problem tab */}
          {hasTabs.problems && (
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'problems'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Problem
            </button>
          )}

          {/* Solution tab */}
          {hasTabs.solutions && (
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'solutions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Solution
            </button>
          )}

          {/* Action tab */}
          {hasTabs.recommendations && (
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'recommendations'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              Action
            </button>
          )}
        </div>
      )}

      {/* Tab content */}
      <div className="p-6">
        {/* About tab content */}
        {activeTab === 'main' && !isEmptyValue(paper.mainIdea) && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paper.mainIdea}
            </p>
          </div>
        )}

        {/* Problem tab content */}
        {activeTab === 'problems' && !isEmptyValue(paper.problems) && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paper.problems}
            </p>
          </div>
        )}

        {/* Solution tab content */}
        {activeTab === 'solutions' && !isEmptyValue(paper.solutions) && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paper.solutions}
            </p>
          </div>
        )}

        {/* Action tab content */}
        {activeTab === 'recommendations' && !isEmptyValue(paper.implement) && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {paper.implement}
            </p>
          </div>
        )}

        {/* External link indicator */}
        {!isEmptyValue(paper.link) && (
          <div className="mt-4 text-xs text-blue-500 dark:text-blue-400 font-medium cursor-pointer hover:underline">
            Click to open paper →
          </div>
        )}
      </div>
    </div>
  );
};
