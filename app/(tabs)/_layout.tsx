import { View } from "react-native";
import { CartBottomSheet, NotifiBottomSheet } from "~/components/BottomSheet";
import FloatingProduct from "~/components/FloatingProduct";
import { Navigation } from "~/components/Navigation";
import { useCart } from "~/context/CartContext";
import { useFloatingProduct } from "~/context/FloatingProductContext";
import { useNotif } from "~/context/NotifContext";
import { useWishlist } from "~/context/WishlistContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { bottomSheetRef, selectedProduct } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { image, isVisible, hideProduct } = useFloatingProduct();
  const { selectedWishlist } = useWishlist();

  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      <CartBottomSheet ref={bottomSheetRef} selectedProduct={selectedProduct} />
      <NotifiBottomSheet
        ref={notifBottomSheetRef}
        selectedProduct={selectedProduct || selectedWishlist}
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
