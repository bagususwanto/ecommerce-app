import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { forwardRef } from "react";
import { Keyboard, TextInput } from "react-native";
import { Input } from "~/components/ui/input";
import { useSearch } from "~/context/SearchContext";
import products from "~/dummy/product";
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
      setSuggestions,
      setFilteredProducts,
      RECENT_SEARCH_KEY,
    } = useSearch();
    const router = useRouter();

    const saveRecentSearch = async (term: string) => {
      if (!term.trim() || recentSearches.includes(term)) return;

      const updatedSearches = [term, ...recentSearches].slice(0, 10); // Maks 10 recent search
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        RECENT_SEARCH_KEY,
        JSON.stringify(updatedSearches)
      );
    };

    const handleSearch = (text: string) => {
      if (text.trim() === "") return;
      saveRecentSearch(text);
      setSearchTerm(text);
      setSuggestions([]);
      Keyboard.dismiss();
      toSearch?.();
      router.push("/product");
    };

    // Update suggestions berdasarkan input
    const handleInputChange = (text: string) => {
      setSearchTerm(text);

      if (text.trim() === "") {
        setSuggestions([]);
      } else {
        const filteredSuggestions = products
          .filter(
            (item) =>
              item.productName.toLowerCase().includes(text.toLowerCase()) ||
              item.productNo.toLowerCase().includes(text.toLowerCase())
          )
          .slice(0, 10);

        const filteredProducts = products.filter(
          (item) =>
            item.productName.toLowerCase().includes(text.toLowerCase()) ||
            item.productNo.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredProducts(filteredProducts);
        setSuggestions(filteredSuggestions);
      }
    };

    return (
      <>
        <Input
          ref={ref}
          className={cn("", className)}
          placeholder={placeholder}
          returnKeyType="search"
          value={searchTerm}
          onChangeText={handleInputChange}
          onSubmitEditing={() => handleSearch(searchTerm)}
          onPress={toSearch}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          icon={Search}
        />
      </>
    );
  }
);
