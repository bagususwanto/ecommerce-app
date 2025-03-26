import React, { useEffect, useState } from "react";
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

export default function SearchScreen() {
  const {
    recentSearches,
    setRecentSearches,
    setSearchTerm,
    RECENT_SEARCH_KEY,
  } = useSearch();

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

  return (
    <View className="flex-1 p-4">
      {/* Recent Searches */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold">Recent Searches</Text>
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={clearAllSearches}>
            <Text className="text-red-700">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentSearches.length > 0 ? (
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3 border-b border-gray-300 flex-row justify-between items-center"
              onPress={() => setSearchTerm(item)}>
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
      ) : (
        <Text className="text-gray-500">No recent searches</Text>
      )}
    </View>
  );
}
