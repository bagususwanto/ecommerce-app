import { View, TouchableOpacity } from "react-native";
import { Text } from "./ui/text";
import { useState } from "react";
import { Bell, ShoppingCart, Search } from "lucide-react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useScroll } from "~/context/ScrollContext";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export function Header() {
  const [selectedLocation, setSelectedLocation] = useState({
    value: "Shop 1",
    label: "Shop 1",
  });
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const locations = [
    {
      value: "Shop 1",
      label: "Shop 1",
    },
    {
      value: "Shop 2",
      label: "Shop 2",
    },
    {
      value: "Shop 3",
      label: "Shop 3",
    },
    {
      value: "Shop 4",
      label: "Shop 4",
    },
  ];

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

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
              <Input
                placeholder="Search product..."
                value={search}
                onChangeText={handleSearch}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                icon={Search}
              />
            </Animated.View>
          ) : (
            <Animated.View style={animatedStyle} className="flex-col pb-1.5">
              <View>
                <Text className="text-white text-md">Location</Text>
                <Select
                  defaultValue={selectedLocation}
                  onValueChange={(option) => {
                    if (option) {
                      setSelectedLocation(option);
                    }
                  }}>
                  <SelectTrigger className="bg-transparent border border-transparent mt-[-10px]">
                    <SelectValue
                      className="text-white text-xl font-bold mr-2"
                      placeholder="Select a location"
                    />
                  </SelectTrigger>
                  <SelectContent insets={contentInsets} className="w-[250px]">
                    <SelectGroup>
                      {locations.map((location) => (
                        <SelectItem
                          label={location.label}
                          key={location.value}
                          value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </View>
            </Animated.View>
          )}

          {/* Icons (Notification & Cart) */}
          <View className="flex-row items-center">
            <TouchableOpacity className="relative">
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
                <Text className="text-white text-xs font-bold">1</Text>
              </Badge>
              <Bell color="white" size={26} />
            </TouchableOpacity>

            <TouchableOpacity className="relative ml-4">
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
                <Text className="text-white text-xs font-bold">1</Text>
              </Badge>
              <ShoppingCart color="white" size={26} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export function HeaderScroll() {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-12">
        <View className="flex-row items-center">
          {/* Baris Kedua: Search Input */}
          <Input
            className="flex-1 max-w-[75%]"
            placeholder="Search product..."
            value={search}
            onChangeText={handleSearch}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            icon={Search}
          />

          {/* Icons (Notification & Cart) */}
          <View className="flex-row items-center px-4">
            <TouchableOpacity className="relative">
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
                <Text className="text-white text-xs font-bold">1</Text>
              </Badge>
              <Bell color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity className="relative ml-4">
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
                <Text className="text-white text-xs font-bold">1</Text>
              </Badge>
              <ShoppingCart color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
