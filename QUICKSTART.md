# Quick Start Guide

## Installation and Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

### 3. Update CSV Data
The CSV file is located at `public/thrive_review.csv`. Replace it with your updated data while the dev server is running - the app will automatically reload.

## Key Features to Try

### Search
- Type in the search bar to filter by title, authors, or main idea
- Search is case-insensitive and real-time
- Click the ✕ button to clear search

### Filter by Category
- Click category buttons to filter papers
- Select multiple categories to narrow results
- Click "Clear filters" to reset
- Categories are automatically extracted from your CSV

### Dark Mode
- Click the sun/moon icon in the header
- Your preference is saved automatically

### View Paper Details
- Each highlighted section shows different aspects of the research
- Click on any paper card to open the actual research link (if available)

## Project Features Implemented

✅ **All Requested Features:**
- React + TypeScript + Tailwind CSS tech stack
- CSV parsing with PapaParse
- Comprehensive search functionality (title, authors, main idea)
- Category filtering by unique THRIVE values
- Smart data handling (skips empty, "-", "N/A" values)
- THRIVE field split into individual blue pill components
- Blue accent color throughout
- Light/dark mode toggle with persistence
- Clickable cards that open links
- Fully responsive design (mobile, tablet, desktop)
- Sticky sidebar filters
- Results counter
- Empty state handling
- Loading spinner
- Error handling

## File Structure
```
src/
├── components/          # Reusable UI components
├── utils/              # Helper functions for CSV parsing and filtering
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main application
├── main.tsx            # React entry point
└── index.css           # Tailwind styles

public/
└── thrive_review.csv   # Your research data

Configuration files:
- package.json
- vite.config.ts
- tailwind.config.js
- tsconfig.json
```

## Build for Production

```bash
npm run build
npm run preview
```

This creates an optimized `dist/` folder ready for deployment.

## Customization Tips

### Change Accent Color
Edit `tailwind.config.js` and change the blue hex code:
```javascript
colors: {
  accent: '#FF5733'  // Your custom color
}
```

### Modify Card Sections
Edit `src/components/PaperCard.tsx` to show/hide different fields or reorder them.

### Change Layout
Edit grid classes in `src/App.tsx`:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for 3-column layout
- `lg:grid-cols-4` changes sidebar width

## Troubleshooting

**Q: CSV not loading?**
A: Ensure `public/thrive_review.csv` exists. Restart the dev server if added after startup.

**Q: Search not showing results?**
A: Try refreshing the page. Check that CSV is being loaded in browser DevTools (Network tab).

**Q: Dark mode not saving?**
A: Ensure browser allows localStorage. Check in DevTools Application tab.

**Q: Want to change active link color in tags?**
A: Search for `bg-blue-500` in `PaperCard.tsx` and modify Tailwind classes.

## Next Steps

1. ✅ Application is ready to use
2. 📊 Add your CSV data to `public/thrive_review.csv`
3. 🎨 Customize colors and styling if needed
4. 🚀 Deploy to your preferred hosting service
5. 📈 Monitor and gather user feedback

## Support Files

- **README.md** - Complete feature documentation
- **DEVELOPMENT.md** - Technical architecture and advanced customization
- **src/types.ts** - TypeScript interface reference

Enjoy your THRIVE Research Papers application! 🎉
