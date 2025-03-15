import { forwardRef, MutableRefObject, useEffect, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Product } from "~/types/product";
import { CircleCheck, Minus, Plus, X } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { Input } from "./ui/input";
import { useFloatingProduct } from "~/context/FloatingProductContext";
import { useNotif } from "~/context/NotifContext";
import { useCart } from "~/context/CartContext";

interface CartBottomSheetProps {
  selectedProduct: Product | null;
}

export const CartBottomSheet = forwardRef<BottomSheet, CartBottomSheetProps>(
  ({ selectedProduct }, ref) => {
    const [quantity, setQuantity] = useState(1);

    const { showProduct } = useFloatingProduct();
    const { handleShowNotif } = useNotif();
    const { bottomSheetRef } = useCart();

    const minOrder = selectedProduct?.minOrder || 1; // Default minOrder = 1

    // Reset quantity saat BottomSheet ditutup
    useEffect(() => {
      if (!selectedProduct) {
        setQuantity(1);
      }
    }, [selectedProduct]);

    const handleAddToCart = (product: Product) => {
      console.log("Add to cart:", product.productName);
      showProduct(product.imageUrl);
      bottomSheetRef.current?.close();

      setTimeout(() => {
        handleShowNotif(product);
      }, 800);
    };

    const handleClose = () => {
      (ref as MutableRefObject<BottomSheet | null>)?.current?.close();
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () =>
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleQuantityChange = (text: string) => {
      const parsedValue = parseInt(text, 10);
      if (!isNaN(parsedValue) && parsedValue >= minOrder) {
        setQuantity(parsedValue);
      } else {
        setQuantity(minOrder); // Tetap minimum order jika kosong
      }
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["35%", "35%"]}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          zIndex: 1000,
        }}
        onChange={(index) => {
          if (index === -1) {
            setQuantity(1); // Reset quantity saat BottomSheet ditutup
          }
        }}>
        {/* Tombol Close */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute right-3 -top-1 z-10">
          <X size={24} color="gray" />
        </TouchableOpacity>
        <BottomSheetView className="p-2 item-center">
          {selectedProduct && (
            <>
              <BottomSheetView className="flex-row gap-4">
                <Image
                  source={{ uri: selectedProduct.imageUrl }}
                  className="rounded-md w-40 h-40"
                  alt={selectedProduct.productNo}
                  resizeMode="cover"
                />
                <BottomSheetView className="flex flex-col w-60">
                  <Text className="font-bold text-gray text-lg flex-wrap">
                    {selectedProduct.productName}
                  </Text>
                  <Text className="text-gray text-md flex-wrap">
                    {selectedProduct.productNo}
                  </Text>
                  <Text className="text-gray text-sm">
                    Min. Order: {minOrder} (PCS)
                  </Text>
                </BottomSheetView>
              </BottomSheetView>
              {/* Quantity Selector */}
              <BottomSheetView className="flex-row items-center justify-between mt-4">
                <Text className="text-gray text-lg">Quantity:</Text>
                <View className="flex-row h-12 items-center gap-4 border border-gray-300 rounded-lg px-4">
                  <TouchableOpacity
                    onPress={decreaseQuantity}
                    disabled={quantity <= minOrder}>
                    <Minus
                      size={20}
                      color={quantity > minOrder ? "gray" : "#ccc"}
                    />
                  </TouchableOpacity>
                  <Input
                    className="border-none h-10 text-center text-md text-gray"
                    keyboardType="numeric"
                    value={String(quantity)}
                    onChangeText={handleQuantityChange}
                  />
                  <TouchableOpacity onPress={increaseQuantity}>
                    <Plus size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              </BottomSheetView>
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
      </BottomSheet>
    );
  }
);

export const NotifiBottomSheet = forwardRef<BottomSheet, CartBottomSheetProps>(
  ({ selectedProduct }, ref) => {
    const handleClose = () => {
      (ref as MutableRefObject<BottomSheet | null>)?.current?.close();
    };

    const handleCheckCart = () => {
      console.log("Check Cart");
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["22%", "22%"]}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          zIndex: 1000,
        }}>
        {/* Tombol Close */}
        <TouchableOpacity
          onPress={handleClose}
          className="absolute right-3 -top-1 z-10">
          <X size={24} color="gray" />
        </TouchableOpacity>
        <BottomSheetView className="p-2 item-center">
          {selectedProduct && (
            <>
              <Text className="font-bold text-gray text-2xl flex-wrap">
                Complete Your Shopping
              </Text>
              <BottomSheetView className="flex-row gap-4 mt-4">
                <Image
                  source={{ uri: selectedProduct.imageUrl }}
                  className="rounded-md w-10 h-10"
                  alt={selectedProduct.productNo}
                  resizeMode="cover"
                />
                <BottomSheetView className="flex flex-col w-60">
                  <Text className="text-gray text-md flex-wrap">
                    {selectedProduct.productName}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <CircleCheck color="green" size={18} />
                    <Text className="text-gray font-bold text-md flex-wrap">
                      Added to the shopping cart
                    </Text>
                  </View>
                </BottomSheetView>
              </BottomSheetView>
              <Button className="mt-4" onPress={() => handleCheckCart()}>
                <View className="flex-row items-center">
                  <Text>Check Shopping Cart</Text>
                </View>
              </Button>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
