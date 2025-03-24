import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

export default function Screen() {
  const router = useRouter();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timeout); // Membersihkan timeout jika user menutup aplikasi lebih cepat
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" color="white" />
      <Text className="text-white text-2xl">Brand</Text>
    </View>
  );
}
