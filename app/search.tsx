import React, { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trash2 } from "lucide-react-native";
import { useSearch } from "~/context/SearchContext";
import { useRouter } from "expo-router";
import { Product } from "~/types/product";
import products from "~/dummy/product";

export default function SearchScreen() {
  const {
    recentSearches,
    setRecentSearches,
    setSearchTerm,
    suggestions,
    setSuggestions,
    setFilteredProducts,
    RECENT_SEARCH_KEY,
  } = useSearch();
  const router = useRouter();

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    const storedSearches = await AsyncStorage.getItem(RECENT_SEARCH_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  };

  const clearAllSearches = async () => {
    Alert.alert(
      "Clear All?",
      "Are you sure you want to clear all recent searches?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            setRecentSearches([]);
            await AsyncStorage.removeItem(RECENT_SEARCH_KEY);
          },
        },
      ]
    );
  };

  const saveRecentSearch = async (term: string) => {
    if (!term.trim() || recentSearches.includes(term)) return;

    const updatedSearches = [term, ...recentSearches].slice(0, 10); // Maks 10 recent search
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem(
      RECENT_SEARCH_KEY,
      JSON.stringify(updatedSearches)
    );
  };

  const handleSearch = (product: Product) => {
    setFilteredProducts([product]);
    saveRecentSearch(product.productName);
    setSearchTerm(product.productName);
    setSuggestions([]);
    Keyboard.dismiss();
    router.push("/product");
  };

  return (
    <View className="flex-1 p-4">
      {recentSearches.length > 0 && suggestions.length === 0 && (
        <>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Recent Searches</Text>
            <TouchableOpacity onPress={clearAllSearches}>
              <Text className="text-red-700">Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border-b border-gray-300 flex-row justify-between items-center"
                onPress={() => {
                  setSearchTerm(item);

                  const filteredProducts = products.filter((p) =>
                    p.productName.toLowerCase().includes(item.toLowerCase())
                  );

                  setFilteredProducts(filteredProducts);
                  router.push("/product");
                }}>
                <Text className="text-base">{item}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    const filteredSearches = recentSearches.filter(
                      (s) => s !== item
                    );
                    setRecentSearches(filteredSearches);
                    await AsyncStorage.setItem(
                      RECENT_SEARCH_KEY,
                      JSON.stringify(filteredSearches)
                    );
                  }}>
                  <Trash2 size={18} color="gray" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.productName}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-300"
              onPress={() => handleSearch(item)}>
              <Text className="text-base">{item.productName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
