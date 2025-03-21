import { View } from "react-native";
import { useScroll } from "~/context/ScrollContext";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LocationSelect } from "./ui/locationselect";
import { SearchBox } from "./ui/searchbox";
import { HeaderIcon } from "./ui/headericon";

export function Header() {
  const { isScrolled, scrollY } = useScroll();

  // Animasi opacity berdasarkan scrollY
  const inputAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(interpolate(scrollY.value, [0, 50], [-1, 1]), {
      duration: 1000, // Tambahkan durasi animasi
      easing: Easing.out(Easing.quad), // Easing untuk efek smooth
    }),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(interpolate(scrollY.value, [0, 50], [1, 0]), {
      duration: 300,
      easing: Easing.out(Easing.quad),
    }),
  }));

  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-5">
        <View className="flex-row justify-between items-center mt-5">
          {isScrolled ? (
            <Animated.View
              style={inputAnimatedStyle}
              className="mt-4 pb-2 flex-1 max-w-[80%]">
              <SearchBox placeholder="Search product..." />
            </Animated.View>
          ) : (
            <Animated.View style={animatedStyle} className="flex-col pb-1.5">
              <LocationSelect />
            </Animated.View>
          )}

          {/* Icons (Notification & Cart) */}
          <HeaderIcon />
        </View>
      </View>
    </View>
  );
}

export function HeaderSimple() {
  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-5">
        <View className="flex-row justify-between items-center mt-5">
          <View className="mt-4 pb-2 flex-1 max-w-[80%]">
            <SearchBox placeholder="Search transaction..." />
          </View>

          {/* Icons (Notification & Cart) */}
          <HeaderIcon />
        </View>
      </View>
    </View>
  );
}
