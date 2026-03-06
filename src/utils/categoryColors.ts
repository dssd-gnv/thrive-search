// Color palette for categories - consistent mapping
const CATEGORY_COLORS = [
  { bg: 'bg-blue-100', text: 'text-blue-900', tag: 'bg-blue-500', border: 'border-blue-300' },
  { bg: 'bg-amber-100', text: 'text-amber-900', tag: 'bg-amber-500', border: 'border-amber-300' },
  { bg: 'bg-orange-100', text: 'text-orange-900', tag: 'bg-orange-500', border: 'border-orange-300' },
  { bg: 'bg-cyan-100', text: 'text-cyan-900', tag: 'bg-cyan-500', border: 'border-cyan-300' },
  { bg: 'bg-lime-100', text: 'text-lime-900', tag: 'bg-lime-500', border: 'border-lime-300' },
  { bg: 'bg-pink-100', text: 'text-pink-900', tag: 'bg-pink-500', border: 'border-pink-300' },
];

export const getCategoryColor = (category: string, categories: string[]) => {
  const index = categories.indexOf(category);
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
};

export const getCategoryColors = (categories: string[]): Record<string, typeof CATEGORY_COLORS[0]> => {
  const colorMap: Record<string, typeof CATEGORY_COLORS[0]> = {};
  categories.forEach((category, index) => {
    colorMap[category] = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
  });
  return colorMap;
};
