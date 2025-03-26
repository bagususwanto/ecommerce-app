import { createContext, useContext, useState } from "react";

type SearchContextType = {
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  RECENT_SEARCH_KEY: string;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const RECENT_SEARCH_KEY = "recentSearches";

  return (
    <SearchContext.Provider
      value={{
        recentSearches,
        setRecentSearches,
        searchTerm,
        setSearchTerm,
        RECENT_SEARCH_KEY,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a CartProvider");
  }
  return context;
}
