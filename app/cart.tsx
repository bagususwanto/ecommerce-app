import { Heart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { ProductUI } from "~/components/ProductUI";
import QuantitySelector from "~/components/QuantitySelector";
import { Card } from "~/components/ui/card";
import { useCart } from "~/context/CartContext";

export default function CartScreen() {
  const { cartItems, setCartItems } = useCart();

  const handleQuantityChange = (minOrder: number, text: string) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue) && parsedValue >= minOrder) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cartItems[0].productNo
            ? { ...item, quantity: parsedValue }
            : item
        )
      );
    } else {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cartItems[0].productNo
            ? { ...item, quantity: minOrder }
            : item
        )
      );
    }
  };

  return (
    <View className="flex-1 items-center">
      {cartItems.map((cart) => (
        <Card
          key={cart.productNo}
          className="rounded-lg p-4 shadow-md border border-gray-200 w-full">
          <ProductUI imageClassName="w-32 h-32" products={cart} />
          <View className="flex-row items-center justify-end mt-4 gap-48">
            <TouchableOpacity>
              <Heart size={20} color={"gray"} />
            </TouchableOpacity>
            <View className="flex-row h-12 items-center gap-4 border border-gray-300 rounded-lg px-4">
              <QuantitySelector
                quantity={cart.quantity}
                setQuantity={(newQuantity) =>
                  handleQuantityChange(cart.minOrder, String(newQuantity))
                }
              />
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
