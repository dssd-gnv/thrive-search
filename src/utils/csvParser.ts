import Papa from 'papaparse';
import type { ResearchPaper } from '../types';

// Google Sheets CSV export URL
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1TjkmhejcFU4GbuEUvL8Oyx5m3yqu3-_0w_kFp4yIBVI/export?format=csv';

const isEmptyValue = (value: string | undefined): boolean => {
  if (!value) return true;
  const trimmed = value.trim();
  return (
    trimmed === '' ||
    trimmed === '-' ||
    trimmed.toLowerCase() === 'n/a' ||
    trimmed === 'NA'
  );
};

const parseThrive = (thriveStr: string): string[] => {
  if (isEmptyValue(thriveStr)) return [];
  return thriveStr
    .split(';')
    .map((item) => item.trim())
    .filter((item) => !isEmptyValue(item));
};

export const parseCSV = async (file: File): Promise<ResearchPaper[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const papers: ResearchPaper[] = (results.data as any[])
          .map((row: any) => ({
            link: row.Link || '',
            title: row.Title || '',
            authors: row.Authors || '',
            mainIdea: row.MainIdea || '',
            problems: row.Problems || '',
            solutions: row.Solutions || '',
            thrive: parseThrive(row.THRIVE || ''),
            implement: row.Implement || '',
          }))
          .filter((paper) => !isEmptyValue(paper.title));

        resolve(papers);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const fetchGoogleSheets = async (): Promise<ResearchPaper[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(GOOGLE_SHEETS_URL, {
      header: true,
      skipEmptyLines: true,
      download: true,
      complete: (results) => {
        const papers: ResearchPaper[] = (results.data as any[])
          .map((row: any) => ({
            link: row.Link || '',
            title: row.Title || '',
            authors: row.Authors || '',
            mainIdea: row.MainIdea || '',
            problems: row.Problems || '',
            solutions: row.Solutions || '',
            thrive: parseThrive(row.THRIVE || ''),
            implement: row.Implement || '',
          }))
          .filter((paper) => !isEmptyValue(paper.title));

        resolve(papers);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const getAllCategories = (papers: ResearchPaper[]): string[] => {
  const categories = new Set<string>();
  papers.forEach((paper) => {
    paper.thrive.forEach((cat: string) => categories.add(cat));
  });
  
  // Sort all categories except "Closed-Loop Referral"
  const sortedCategories = Array.from(categories)
    .filter((cat) => cat !== 'Closed-Loop Referrals')
    .sort();
  
  // Add "Closed-Loop Referral" at the end if it exists
  if (categories.has('Closed-Loop Referrals')) {
    sortedCategories.push('Closed-Loop Referrals');
  }
  
  return sortedCategories;
};

export const filterPapers = (
  papers: ResearchPaper[],
  searchQuery: string,
  selectedCategories: string[]
): ResearchPaper[] => {
  return papers.filter((paper) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      paper.title.toLowerCase().includes(query) ||
      paper.authors.toLowerCase().includes(query) ||
      paper.mainIdea.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategories.length === 0 ||
      paper.thrive.some((cat: string) => selectedCategories.includes(cat));

    return matchesSearch && matchesCategory;
  });
};
