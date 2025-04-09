import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Text } from "~/components/ui/text";

export function LocationSelect() {
  const [selectedLocation, setSelectedLocation] = useState({
    value: "Shop 1",
    label: "Shop 1",
  });

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
    <View>
      <Text className="text-white font-normal text-md">Location</Text>
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
  );
}
