import { View, Text } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function AccountScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12">
      <Text>Account Screen</Text>
      <View className="flex-row items-center">
        <ThemeToggle />
      </View>
    </View>
  );
}
