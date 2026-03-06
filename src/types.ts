// Data type definitions for the application

export interface ResearchPaper {
  link: string;
  title: string;
  authors: string;
  mainIdea: string;
  problems: string;
  solutions: string;
  thrive: string[]; // THRIVE categories
  implement: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
}
