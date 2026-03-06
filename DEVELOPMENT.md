# Development Guide

This document provides detailed information about the application architecture, component structure, and how to extend functionality.

## Architecture Overview

```
App Component
├── State Management
│   ├── papers (ResearchPaper[])
│   ├── categories (string[])
│   ├── filters (FilterState)
│   ├── isDarkMode (boolean)
│   ├── isLoading (boolean)
│   └── error (string | null)
├── Components
│   ├── SearchBar
│   ├── CategoryFilter
│   ├── DarkModeToggle
│   └── PaperCard (in grid)
└── Utilities
    └── csvParser (parse, filter, categorize)
```

## Component Details

### App.tsx
**Purpose:** Main application container and orchestrator

**Responsibilities:**
- Loads CSV data on mount
- Manages global state (papers, filters, dark mode)
- Handles dark mode persistence
- Renders layout and components
- Implements responsive grid (1 col → 3 col layout)

**Key Hooks:**
- `useState` - State management for papers, filters, dark mode
- `useEffect` - CSV loading and dark mode initialization

### PaperCard.tsx
**Purpose:** Displays individual research paper information

**Features:**
- Conditional rendering of sections based on data availability
- Click handling to open external links
- Visual feedback (cursor change, hover effects)
- Responsive layout with line clamping
- Blue tags for THRIVE categories

**Props:**
```typescript
interface PaperCardProps {
  paper: ResearchPaper;
}
```

### SearchBar.tsx
**Purpose:** Full-text search input

**Features:**
- Placeholder text for guidance
- Clear button that appears when input is active
- Dark mode support
- Focus ring styling

**Props:**
```typescript
interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
```

### CategoryFilter.tsx
**Purpose:** Filter papers by THRIVE categories

**Features:**
- Toggle multiple categories simultaneously
- Visual active state (blue background)
- "Clear filters" button
- Dynamic category list from data

**Props:**
```typescript
interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}
```

### DarkModeToggle.tsx
**Purpose:** Light/dark mode switcher

**Features:**
- Sun/moon icons
- Smooth transitions
- Accessibility attributes

**Props:**
```typescript
interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}
```

## Utilities

### csvParser.ts

**Functions:**

#### `parseCSV(file: File): Promise<ResearchPaper[]>`
- Reads and parses CSV file using PapaParse
- Maps CSV columns to ResearchPaper interface
- Filters out papers without titles
- Parses THRIVE field into individual tags
- **Returns:** Array of typed ResearchPaper objects

#### `getAllCategories(papers: ResearchPaper[]): string[]`
- Extracts unique THRIVE categories from all papers
- Sorts alphabetically
- **Returns:** Sorted array of category strings

#### `filterPapers(papers, searchQuery, selectedCategories): ResearchPaper[]`
- Filters papers based on search query (title, authors, mainIdea)
- Filters papers based on selected categories
- Case-insensitive search
- **Returns:** Filtered array matching all criteria

#### `isEmptyValue(value: string): boolean`
- Helper to check for empty/placeholder values
- Treats `-`, `N/A`, `NA`, empty string as empty
- **Returns:** Boolean indicating if value is empty

## Data Types

### ResearchPaper
```typescript
interface ResearchPaper {
  link: string;           // URL to paper
  title: string;         // Paper title
  authors: string;       // Author names
  mainIdea: string;      // Main research idea
  problems: string;      // Key problems
  solutions: string;     // Solutions proposed
  thrive: string[];      // Array of category tags
  implement: string;     // Implementation details
}
```

### FilterState
```typescript
interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
}
```

## Styling System

### Tailwind Configuration
- Extends default theme with custom colors
- Blue (#3b82f6) as primary accent for interactive elements
- Dark mode enabled via class strategy

```javascript
theme: {
  extend: {
    colors: {
      accent: '#3b82f6'
    }
  },
  darkMode: 'class',
}
```

### Key CSS Classes

**Layout:**
- `max-w-7xl` - Container max width
- `grid grid-cols-1 lg:grid-cols-4` - Sidebar + content layout
- `grid grid-cols-1 md:grid-cols-2` - Paper cards grid

**Typography:**
- `text-3xl font-bold` - Main title
- `text-lg font-bold` - Paper title
- `text-sm` - Body text
- `line-clamp-3` - Truncate text to 3 lines

**Colors (Dark Mode Support):**
- `bg-white dark:bg-gray-800` - Card backgrounds
- `text-gray-900 dark:text-white` - Text color
- `border-gray-300 dark:border-gray-600` - Borders

**Interactive:**
- `hover:shadow-lg` - Card hover effect
- `focus:ring-2 focus:ring-blue-500` - Input focus state
- `cursor-pointer` - Clickable indication

## Dark Mode Implementation

**Initialization:**
1. Check localStorage for saved preference
2. Fall back to system preference
3. Apply class to document root

**Persistence:**
- Saved to localStorage as JSON string
- Loaded on next page visit

**Tailwind Integration:**
```css
/* Dark mode classes automatically generated by Tailwind */
dark:bg-gray-900
dark:text-white
/* etc... */
```

## Customization Guide

### Change Accent Color

Edit `tailwind.config.js`:
```javascript
colors: {
  accent: '#YOUR_HEX_COLOR'  // Change blue to your color
}
```

Then update components to use the new color in Tailwind classes.

### Modify Paper Card Fields

In `PaperCard.tsx`, add or remove sections:
```typescript
{!isEmptyValue(paper.yourNewField) && (
  <div>
    <h3 className="text-sm font-semibold...">Label:</h3>
    <p className="text-sm...">{paper.yourNewField}</p>
  </div>
)}
```

### Change Grid Layout

In `App.tsx`:
```typescript
// Card grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Add New Filter Type

1. Extend `FilterState` in `types.ts`
2. Add state variable in `App.tsx`
3. Create new filter component
4. Implement filter logic in `csvParser.ts`

## Performance Considerations

1. **CSV Parsing:** Done once on app initialization
2. **Filtering:** Efficient array operations
3. **Re-renders:** Optimized with proper state separation
4. **Responsive:** Tailwind's responsive classes prevent layout shift
5. **Dark Mode:** CSS custom properties enable instant switching

## Browser DevTools

### Debug Tips:
- Use React DevTools to inspect component state
- Use Network tab to verify CSV loads correctly
- Use Lighthouse for performance audits
- Check localStorage values with DevTools

## Example Extension: Adding Sorting

1. **Add to FilterState:**
```typescript
sortBy: 'relevance' | 'title' | 'date';
```

2. **Create SortSelector Component**

3. **Implement sorting in filterPapers:**
```typescript
const sorted = filtered.sort((a, b) => {
  if (sortBy === 'title') return a.title.localeCompare(b.title);
  // ... other sorting logic
});
```

## Testing Suggestions

- Verify CSV parsing with malformed data
- Test search with special characters
- Test category filtering with multiple selections
- Verify dark mode persists across page reloads
- Test responsive breakpoints
- Verify empty state displays correctly

## Deployment

### Build
```bash
npm run build
```

### Deploy Static Files
Deploy the `dist/` folder to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- etc.

### Environment Variables
Currently, no environment variables needed. Add support via:
```bash
import.meta.env.VITE_VAR_NAME
```

## Troubleshooting

### CSV not loading
- Check `public/thrive_review.csv` exists
- Verify CORS headers if loading from external source
- Check browser console for fetch errors

### Styling not applied
- Rebuild Tailwind with `npm run build`
- Ensure `content` paths in tailwind.config.js are correct

### Dark mode not persisting
- Check localStorage is enabled
- Check for storage quota issues

### Search not working
- Verify CSV is parsed correctly
- Check filter logic in csvParser.ts
- Test with simple search terms

## Future Enhancements

Potential features to add:
- [ ] Sort by relevance/title/date
- [ ] Export filtered results as CSV/PDF
- [ ] Bookmark favorite papers
- [ ] Advanced search with AND/OR operators
- [ ] Category grouping/collapsing
- [ ] Paper comparison view
- [ ] Recently viewed papers
- [ ] Search suggestions/autocomplete
- [ ] Analytics dashboard
- [ ] User comments/annotations
