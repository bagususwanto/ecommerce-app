import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";

// Komponen untuk tombol back
export function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity className="mr-4" onPress={() => router.back()}>
      <ArrowLeft size={20} className="text-primary font-extrabold" />
    </TouchableOpacity>
  );
}
