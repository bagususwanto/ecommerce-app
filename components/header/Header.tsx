import { View } from "react-native";
import { useScroll } from "~/context/ScrollContext";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { SearchBox } from "./ui/searchbox";
import { useState } from "react";
import IconButton from "../IconButton";
import { Bell, ShoppingCart } from "lucide-react-native";
import { useCart } from "~/context/CartContext";
import { useRouter } from "expo-router";

export function Header() {
  const { scrollY } = useScroll();
  const [searchBoxEnabled, setSearchBoxEnabled] = useState(false);
  const { cartCount } = useCart();
  const router = useRouter();

  // Animasi opacity untuk SearchBox
  const opacity = useDerivedValue(() => {
    const newOpacity = interpolate(scrollY.value, [0, 80], [0, 1]);

    // Update state `searchBoxEnabled` di thread JavaScript utama
    runOnJS(setSearchBoxEnabled)(newOpacity > 0.1);

    return withTiming(newOpacity, {
      duration: 3,
      easing: Easing.out(Easing.quad),
    });
  });

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Pointer Events menggunakan state, agar tidak bug saat scroll kembali
  const pointerEvents = searchBoxEnabled ? "auto" : "none";

  // Animasi perubahan background dari transparent ke bg-primary
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [0, 50], // Jarak scroll
      ["transparent", "#04349c"] // Warna dari transparent ke bg-primary
    ),
  }));

  return (
    <Animated.View
      style={headerAnimatedStyle}
      pointerEvents="box-none"
      className="absolute top-0 left-0 right-0 z-50">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <Animated.View
            pointerEvents={pointerEvents}
            style={inputAnimatedStyle}
            className="flex-1 max-w-[90%]">
            <SearchBox placeholder="Search product..." />
          </Animated.View>
          {/* Icons (Notification & Cart) */}
          <IconButton className="ml-2" icon={Bell} />
          <IconButton
            className="ml-2"
            icon={ShoppingCart}
            counting={true}
            count={cartCount}
            onPress={() => router.push("/cart")}
          />
        </View>
      </View>
    </Animated.View>
  );
}

export function HeaderSimple() {
  const { cartCount } = useCart();
  const router = useRouter();
  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-1 max-w-[90%]">
            <SearchBox placeholder="Search transaction..." />
          </View>

          {/* Icons (Notification & Cart) */}
          <IconButton className="ml-2" icon={Bell} />
          <IconButton
            className="ml-2"
            icon={ShoppingCart}
            counting={true}
            count={cartCount}
            onPress={() => router.push("/cart")}
          />
        </View>
      </View>
    </View>
  );
}
