import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button onPress={() => router.replace("/(tabs)/home")}>
        <Text>Go to Home</Text>
      </Button>
    </View>
  );
}
