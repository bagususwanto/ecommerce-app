import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      router.replace("/login"); // Setelah 2 detik, masuk ke login
    }, 2000);
  }, []);
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" color="white" />
      <Text className="text-white text-2xl">Brand</Text>
    </View>
  );
}
