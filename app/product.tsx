import React from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CartBottomSheet, NotifiBottomSheet } from "~/components/BottomSheet";
import FloatingProduct from "~/components/FloatingProduct";
import { ProductList } from "~/components/ProductCard";
import { useCart } from "~/context/CartContext";
import { useFloatingProduct } from "~/context/FloatingProductContext";
import { useNotif } from "~/context/NotifContext";
import { useSearch } from "~/context/SearchContext";

export default function ProductScreen() {
  const { filteredProducts } = useSearch();
  const { bottomSheetRef, selectedProduct } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { handleAddToCart } = useCart();
  const { image, isVisible, hideProduct } = useFloatingProduct();

  return (
    <>
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            bottomSheetRef.current?.close();
            notifBottomSheetRef.current?.dismiss();
          }}
          accessible={false}>
          <View className="flex-1">
            <View className="w-full p-4">
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {isVisible && (
        <FloatingProduct
          image={image!}
          startAnimation={isVisible}
          onAnimationEnd={hideProduct}
        />
      )}
      <NotifiBottomSheet
        ref={notifBottomSheetRef}
        selectedProduct={selectedProduct}
      />
      <CartBottomSheet ref={bottomSheetRef} selectedProduct={selectedProduct} />
    </>
  );
}
