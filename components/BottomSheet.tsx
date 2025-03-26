import { forwardRef, useEffect, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Product } from "~/types/product";
import { CircleCheck, Plus } from "lucide-react-native";
import { Image, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useFloatingProduct } from "~/context/FloatingProductContext";
import { useNotif } from "~/context/NotifContext";
import { useCart } from "~/context/CartContext";
import { ProductUI } from "./ProductUI";
import { useRouter } from "expo-router";
import QuantitySelector from "./QuantitySelector";

interface CartBottomSheetProps {
  selectedProduct: Product | null;
}

export const CartBottomSheet = forwardRef<
  BottomSheetModal,
  CartBottomSheetProps
>(({ selectedProduct }, ref) => {
  const minOrder = selectedProduct?.minOrder || 1; // Default minOrder = 1
  const [quantity, setQuantity] = useState(minOrder);

  const { showProduct } = useFloatingProduct();
  const { handleShowNotif } = useNotif();
  const { bottomSheetRef, setCartItems, cartItems } = useCart();

  // Reset quantity saat BottomSheet ditutup
  useEffect(() => {
    if (!selectedProduct) {
      setQuantity(minOrder);
    }
  }, [selectedProduct]);

  const handleAddToCart = (product: Product) => {
    showProduct(product.imageUrl);
    bottomSheetRef.current?.close();

    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productNo === product.productNo
      );

      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.productNo === product.productNo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: quantity }];

      return updatedCart;
    });

    setTimeout(() => {
      handleShowNotif(product);

      // setCartCount((prevCount) => {
      //   const existingItem = cartItems.find(
      //     (item) => item.productNo === product.productNo
      //   );

      //   if (existingItem) {
      //     return prevCount;
      //   } else {
      //     return prevCount + 1;
      //   }
      // });
    }, 100);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={{ borderColor: "#e5e7eb", borderWidth: 1, borderRadius: 10 }}
        ref={bottomSheetRef}
        onChange={() => setQuantity(minOrder)}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // Tutup keyboard jika terbuka
          }}>
          <BottomSheetView className="p-4">
            {selectedProduct && (
              <>
                <ProductUI products={selectedProduct} />
                {/* Quantity Selector */}
                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-black text-lg">Quantity:</Text>
                  <View className="flex-row h-12 items-center gap-4 border border-gray-300 rounded-lg px-4">
                    <QuantitySelector
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </View>
                </View>
                <Button
                  className="mt-4"
                  onPress={() => handleAddToCart(selectedProduct)}>
                  <View className="flex-row items-center gap-2">
                    <Plus color="white" size={18} />
                    <Text>Shopping Cart</Text>
                  </View>
                </Button>
              </>
            )}
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export const NotifiBottomSheet = forwardRef<
  BottomSheetModal,
  CartBottomSheetProps
>(({ selectedProduct }, ref) => {
  const route = useRouter();
  const { notifBottomSheetRef } = useNotif();

  // const handleClose = () => {
  //   (ref as MutableRefObject<BottomSheetModal | null>)?.current?.close();
  // };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={notifBottomSheetRef}
        style={{ borderColor: "#e5e7eb", borderWidth: 1, borderRadius: 10 }}>
        <BottomSheetView className="p-4 item-center">
          {selectedProduct && (
            <>
              <Text className="font-bold text-black text-2xl flex-wrap">
                Complete Your Shopping
              </Text>
              <View className="flex-row gap-4 mt-4">
                <Image
                  source={{ uri: selectedProduct.imageUrl }}
                  className="rounded-md w-10 h-10"
                  alt={selectedProduct.productNo}
                  resizeMode="cover"
                />
                <View className="flex flex-col">
                  <Text className="text-black text-md flex-wrap">
                    {selectedProduct.productName}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <CircleCheck color="green" size={18} />
                    <Text className="text-black font-bold text-md flex-wrap">
                      Added to the shopping cart
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                className="mt-4"
                onPress={() => {
                  notifBottomSheetRef.current?.close();
                  route.push("/cart");
                }}>
                <View className="flex-row items-center">
                  <Text>Check Shopping Cart</Text>
                </View>
              </Button>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
