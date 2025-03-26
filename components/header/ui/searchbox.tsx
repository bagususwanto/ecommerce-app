import AsyncStorage from "@react-native-async-storage/async-storage";
import { Search } from "lucide-react-native";
import { forwardRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { Input } from "~/components/ui/input";
import { useSearch } from "~/context/SearchContext";
import { cn } from "~/lib/utils";

interface SearchBoxProps {
  placeholder: string;
  className?: string;
  toSearch?: () => void;
}

export const SearchBox = forwardRef<TextInput, SearchBoxProps>(
  ({ placeholder, className, toSearch }, ref) => {
    const {
      recentSearches,
      setRecentSearches,
      searchTerm,
      setSearchTerm,
      RECENT_SEARCH_KEY,
    } = useSearch();

    const saveRecentSearch = async (term: string) => {
      if (!term.trim() || recentSearches.includes(term)) return;

      const updatedSearches = [term, ...recentSearches].slice(0, 10); // Maks 10 recent search
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        RECENT_SEARCH_KEY,
        JSON.stringify(updatedSearches)
      );
    };

    const handleSearch = () => {
      if (searchTerm.trim() === "") return;
      saveRecentSearch(searchTerm);
      Keyboard.dismiss(); // Menutup keyboard
    };

    return (
      <Input
        ref={ref}
        className={cn("", className)}
        placeholder={placeholder}
        returnKeyType="search"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        onPress={toSearch}
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
        icon={Search}
      />
    );
  }
);
