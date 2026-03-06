import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  colorMap: Record<string, { bg: string; text: string; tag: string; border: string }>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  colorMap,
}) => {
  // Toggle a category on/off
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Filter by Category
      </h3>

      {categories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No categories available</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const colors = colorMap[category];
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isSelected
                    ? `${colors.tag} text-white`
                    : `${colors.bg} ${colors.text} hover:opacity-80 border border-current `
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {selectedCategories.length > 0 && (
        <button
          onClick={() => onCategoryChange([])}
          className="text-sm text-blue-500 dark:text-blue-400 hover:underline font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
