import { View, ScrollView } from "react-native";
import { CartBottomSheet, NotifiBottomSheet } from "~/components/BottomSheet";
import FloatingProduct from "~/components/FloatingProduct";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { CartProvider, useCart } from "~/context/CartContext";
import {
  FloatingProductProvider,
  useFloatingProduct,
} from "~/context/FloatingProductContext";
import { NotifProvider, useNotif } from "~/context/NotifContext";
import { useEffect } from "react";
import { ScrollProvider, useScroll } from "~/context/ScrollContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FloatingProductProvider>
        <NotifProvider>
          <ScrollProvider>
            <MainLayout>{children}</MainLayout>
          </ScrollProvider>
        </NotifProvider>
      </FloatingProductProvider>
    </CartProvider>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { bottomSheetRef, selectedProduct } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { image, isVisible, hideProduct } = useFloatingProduct();
  const { scrollDirection } = useScroll();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(scrollDirection === "down" ? 0.5 : 1, {
      duration: 300,
    });
  }, [scrollDirection]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <Navigation />
      <CartBottomSheet ref={bottomSheetRef} selectedProduct={selectedProduct} />
      <NotifiBottomSheet
        ref={notifBottomSheetRef}
        selectedProduct={selectedProduct}
      />
      {isVisible && (
        <FloatingProduct
          image={image!}
          startAnimation={isVisible}
          onAnimationEnd={hideProduct}
        />
      )}
    </View>
  );
}
