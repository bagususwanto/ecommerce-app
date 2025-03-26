import { Heart, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import IconButton from "~/components/IconButton";
import { ProductUI } from "~/components/ProductUI";
import QuantitySelector from "~/components/QuantitySelector";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import { useCart } from "~/context/CartContext";
import { Cart } from "~/types/cart";

export default function CartScreen() {
  const { cartItems, setCartItems } = useCart();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { isChange } = useCart();

  const isAllChecked =
    cartItems.length > 0 &&
    cartItems.every((item) => checkedItems[item.productNo]);

  const handleQuantityChange = (cart: Cart, text: string) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue) && parsedValue >= cart.minOrder) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cart.productNo
            ? { ...item, quantity: parsedValue }
            : item
        )
      );
    } else {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cart.productNo
            ? { ...item, quantity: cart.minOrder }
            : item
        )
      );
    }
  };

  const handleCheckedChange = (productNo: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [productNo]: !prevCheckedItems[productNo], // Toggle status
    }));
  };

  // Hitung jumlah item yang dicheck
  const selectedItems = cartItems.filter(
    (item) => checkedItems[item.productNo]
  );

  // Fungsi untuk memilih/deselect semua item
  const handleSelectAll = () => {
    if (isAllChecked) {
      // Uncheck all
      setCheckedItems({});
    } else {
      // Check all
      const newChecked = cartItems.reduce((acc, item) => {
        acc[item.productNo] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setCheckedItems(newChecked);
    }
  };

  const handleDelete = (productNo: string) => {
    const itemToDelete = cartItems.find((item) => item.productNo === productNo);
    if (!itemToDelete) return;

    setCartItems((prevCart) =>
      prevCart.filter((item) => item.productNo !== productNo)
    );

    Toast.show({
      type: "success",
      text1: "Item deleted",
      text2: "Click 'Undo' to restore",
      position: "bottom",
      props: { onUndo: () => handleUndo(itemToDelete) }, // Pastikan ini sesuai dengan toastConfig
    });
  };

  const handleUndo = (item: Cart) => {
    setCartItems((prevCart) => [...prevCart, item]);

    Toast.hide();
  };

  const toastConfig = {
    success: ({ text1, text2, props }: ToastConfigParams<any>) => (
      <View className="bg-white p-4 rounded-lg flex-row justify-between items-center shadow-lg">
        <View>
          <Text className="font-bold">{text1}</Text>
          <Text>{text2}</Text>
        </View>
        <TouchableOpacity onPress={props.onUndo} className="ml-4">
          <Text className="text-primary font-bold">Undo</Text>
        </TouchableOpacity>
      </View>
    ),
  };

  return (
    <View className="flex-1">
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }} // Sesuaikan padding agar tidak tertutup tombol checkout
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center">
          {cartItems.length === 0 ? (
            <Text className="text-gray-500 text-lg text-center">
              Cart is empty
            </Text>
          ) : (
            cartItems.map((cart) => (
              <Card
                key={cart.productNo}
                className="p-4 border border-gray-200 w-full">
                <View className="flex-row justify-between items-center mb-4">
                  <Checkbox
                    className="h-5 w-5 border border-gray-500"
                    checked={checkedItems[cart.productNo] || false}
                    onCheckedChange={() => handleCheckedChange(cart.productNo)}
                  />
                  <IconButton
                    icon={Trash2}
                    color="gray"
                    size={20}
                    onPress={() => handleDelete(cart.productNo)}
                  />
                </View>
                <ProductUI imageClassName="w-32 h-32" products={cart} />
                <View className="flex-row items-center justify-end mt-4 gap-44">
                  <IconButton
                    icon={Heart}
                    color="gray"
                    size={20}
                    onPress={() => console.log("Add to wishlist")}
                  />
                  <View className="flex-row h-12 items-center gap-4 border border-gray-300 rounded-lg px-4">
                    <QuantitySelector
                      quantity={cart.quantity}
                      setQuantity={(newQuantity) =>
                        handleQuantityChange(cart, String(newQuantity))
                      }
                    />
                  </View>
                </View>
              </Card>
            ))
          )}
        </View>
      </ScrollView>

      {/* Tombol Checkout di bagian bawah */}
      {cartItems.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center gap-2">
              <Checkbox
                className="h-5 w-5 border border-gray-500"
                checked={isAllChecked}
                onCheckedChange={handleSelectAll}
              />
              <Text className="text-gray-700">Select All</Text>
            </View>
            {isChange ? (
              <Button
                variant={"outline"}
                className=" py-3 rounded-lg items-center"
                disabled={selectedItems.length === 0}
                onPress={() => console.log("Proceed to Delete", selectedItems)}>
                <View className="flex-row items-center gap-2">
                  <Text className="text-primary text-lg font-bold">
                    Delete ({selectedItems.length} items)
                  </Text>
                </View>
              </Button>
            ) : (
              <Button
                className="bg-primary py-3 rounded-lg items-center"
                disabled={selectedItems.length === 0}
                onPress={() =>
                  console.log("Proceed to Checkout", selectedItems)
                }>
                <View className="flex-row items-center gap-2">
                  <Text className="text-white text-lg font-bold">
                    Checkout ({selectedItems.length} items)
                  </Text>
                </View>
              </Button>
            )}
          </View>
        </View>
      )}
      <Toast config={toastConfig} />
    </View>
  );
}
