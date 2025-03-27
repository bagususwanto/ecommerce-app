import React from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ProductList } from "~/components/ProductCard";
import { useCart } from "~/context/CartContext";
import { useNotif } from "~/context/NotifContext";
import { useSearch } from "~/context/SearchContext";

export default function ProductScreen() {
  const { filteredProducts } = useSearch();
  const { bottomSheetRef } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { handleAddToCart } = useCart();

  return (
    <ScrollView
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Tutup keyboard jika terbuka
          bottomSheetRef.current?.close(); // Tutup BottomSheet
          notifBottomSheetRef.current?.close();
        }}>
        <View className="w-full p-4">
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
