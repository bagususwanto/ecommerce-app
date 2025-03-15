import { View, TouchableOpacity } from "react-native";
import { Text } from "./ui/text";
import { useState } from "react";
import { Bell, ShoppingCart, Heart, Search } from "lucide-react-native";
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

  return (
    <View className="bg-primary">
      <View className="py-4 px-4 mt-5">
        <View className="flex-row justify-between items-center mt-5">
          {/* Location Selector */}
          <View className="flex-col">
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

          {/* Icons (Notification & Cart) */}
          <View className="flex-row items-center">
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

        {/* Baris Kedua: Search Input */}
        <View className="flex-row items-center mt-4">
          <Input
            className="flex-1 max-w-[80%]"
            placeholder="Search product..."
            value={search}
            onChangeText={handleSearch}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            icon={Search}
          />

          {/* Wishlist Button */}
          <TouchableOpacity className="ml-4 border-2 border-white rounded-full p-2">
            <Heart color="white" size={16} />
          </TouchableOpacity>
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
