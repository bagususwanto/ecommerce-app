import { useEffect } from "react";
import { View, Text } from "react-native";
import { useSearch } from "~/context/SearchContext";

export default function WishlistScreen() {
  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm("");
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Wishlist Screen</Text>
    </View>
  );
}
