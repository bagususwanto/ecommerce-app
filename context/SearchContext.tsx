import { createContext, useContext, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Product } from "~/types/product";

type SearchContextType = {
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Product[];
  setSuggestions: React.Dispatch<React.SetStateAction<Product[]>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  RECENT_SEARCH_KEY: string;
  searchBoxRef: React.RefObject<TextInput>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchBoxRef = useRef<TextInput>(null);

  const RECENT_SEARCH_KEY = "recentSearches";

  return (
    <SearchContext.Provider
      value={{
        recentSearches,
        setRecentSearches,
        searchTerm,
        setSearchTerm,
        suggestions,
        setSuggestions,
        filteredProducts,
        setFilteredProducts,
        RECENT_SEARCH_KEY,
        searchBoxRef,
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
