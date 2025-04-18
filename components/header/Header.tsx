import { TouchableOpacity, View } from "react-native";
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
import { useEffect,  useState } from "react";
import IconButton from "../IconButton";
import { Bell, ShoppingCart } from "lucide-react-native";
import { useCart } from "~/context/CartContext";
import { useRouter } from "expo-router";
import { BackButton } from "../ArrowBack";
import { Text } from "../ui/text";
import { useSearch } from "~/context/SearchContext";

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

  useEffect(() => {
    scrollY.value = 0;
  }, []);

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
            <SearchBox
              placeholder="Search product..."
              toSearch={() => {
                router.push("/search");
              }}
            />
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

export function HeaderCart() {
  const { isChange, setIsChange } = useCart();
  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <View className="gap-2 flex-row items-center">
            <BackButton />
            <Text className="text-white font-bold text-xl">Cart</Text>
          </View>
          <View className="gap-2 flex-row items-center">
            <TouchableOpacity onPress={() => setIsChange(!isChange)}>
              <Text className="text-white text-lg">
                {isChange ? "Done" : "Change"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export function HeaderSearch() {
  const { searchBoxRef } = useSearch();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      searchBoxRef.current?.focus(); // Fokuskan input saat header muncul
    }, 300);
  }, []);

  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <BackButton onPress={() => router.push("/home")} />
          <View className="gap-2 flex-1 items-center">
            <SearchBox ref={searchBoxRef} placeholder="Search product..." />
          </View>
        </View>
      </View>
    </View>
  );
}

export function HeaderProduct() {
  const router = useRouter();
  const { cartCount } = useCart();

  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <BackButton onPress={() => router.push("/search")} />
          <View className="gap-2 flex-row items-center">
            <SearchBox
              className="max-w-[87%]"
              placeholder="Search product..."
              toSearch={() => {
                router.push("/search");
              }}
            />
            <IconButton
              icon={ShoppingCart}
              counting={true}
              count={cartCount}
              onPress={() => router.push("/cart")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

interface HeaderMinimalProps {
  screen: string;
}

export function HeaderMinimal({ screen }: HeaderMinimalProps) {
  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-8">
        <View className="flex-row justify-between items-center mt-4">
          <View className="gap-2 flex-row items-center">
            <BackButton />
            <Text className="text-white font-bold text-xl">{screen}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
