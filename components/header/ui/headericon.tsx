import { useRouter } from "expo-router";
import { Bell, ShoppingCart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Text } from "~/components/ui/text";
import { useCart } from "~/context/CartContext";
import { cn } from "~/lib/utils";

interface HeaderIconProps {
  className?: string;
}

export function HeaderIcon({ className }: HeaderIconProps) {
  const router = useRouter();
  const { cartCount } = useCart();

  return (
    <View className={cn("flex-row items-center", className)}>
      <TouchableOpacity className="relative">
        <Bell color="white" size={26} />
      </TouchableOpacity>

      <TouchableOpacity
        className="relative ml-4"
        onPress={() => router.push("/cart")}>
        {cartCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
            <Text className="text-white text-xs font-bold">{cartCount}</Text>
          </Badge>
        )}
        <ShoppingCart color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
}
