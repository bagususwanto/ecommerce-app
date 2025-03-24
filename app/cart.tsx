import { Heart } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import IconButton from "~/components/IconButton";
import { ProductUI } from "~/components/ProductUI";
import QuantitySelector from "~/components/QuantitySelector";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useCart } from "~/context/CartContext";
import { Cart } from "~/types/cart";

export default function CartScreen() {
  const { cartItems, setCartItems } = useCart();

  const handleQuantityChange = (cart: Cart, text: string) => {
    console.log("handleQuantityChange");
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

  return (
    <View className="flex-1">
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }} // Beri jarak bawah
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
                className="rounded-lg p-4 shadow-md border border-gray-200 w-full">
                <ProductUI imageClassName="w-32 h-32" products={cart} />
                <View className="flex-row items-center justify-end mt-4 gap-48">
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
    </View>
  );
}
