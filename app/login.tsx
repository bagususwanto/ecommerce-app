import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-12 justify-between">
      {/* Content */}
      <View>
        {/* Logo */}
        <View className="items-center my-10">
          <Image
            source={require("../assets/brands/twiis_primary.png")}
            className="w-48 h-24"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold mt-4">Welcome Back!</Text>
          <Text className="text-gray-500">Please login to continue</Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <Input
            placeholder="Username"
            placeholderClassName="text-black"
            className="px-4 py-1 rounded-lg shadow-lg shadow-slate-500"
          />
          <Input
            placeholder="Password"
            secureTextEntry
            className="px-4 py-1 rounded-lg shadow-lg shadow-slate-500"
          />
        </View>

        {/* Login Button */}
        <Button
          onPress={() => router.replace("/(tabs)/home")}
          className="mt-6 py-3 rounded-xl">
          <Text className="text-white font-semibold text-center">Login</Text>
        </Button>

        {/* Optional: Forgot Password or Sign Up */}
        {/* <View className="mt-4 items-center">
          <Text className="text-sm text-gray-500">Forgot your password?</Text>
        </View> */}
      </View>

      {/* Footer */}
      <View className="items-center mt-10">
        <Text className="text-xs text-gray-400">
          © 2025 Dx Warehouse. All rights reserved.
        </Text>
        {/* <Text className="text-xs text-gray-400">
          © 2025 Twiis. All rights reserved.
        </Text> */}
      </View>
    </View>
  );
}
