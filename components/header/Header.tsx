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
import { LocationSelect } from "./ui/locationselect";
import { SearchBox } from "./ui/searchbox";
import { HeaderIcon } from "./ui/headericon";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [searchBoxEnabled, setSearchBoxEnabled] = useState(false);

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
      <View className="py-4 px-4 mt-4">
        <View className="flex-row justify-between items-center mt-4">
          <Animated.View
            pointerEvents={pointerEvents}
            style={inputAnimatedStyle}
            className="flex-1 max-w-[90%]">
            <SearchBox placeholder="Search product..." />
          </Animated.View>
          {/* Icons (Notification & Cart) */}
          <HeaderIcon className="ml-4"/>
        </View>
      </View>
    </Animated.View>
  );
}

export function HeaderSimple() {
  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-4">
        <View className="flex-row justify-between items-center mt-4">
          <View className="mt-4 flex-1 max-w-[90%]">
            <SearchBox placeholder="Search transaction..." />
          </View>

          {/* Icons (Notification & Cart) */}
          <HeaderIcon />
        </View>
      </View>
    </View>
  );
}
