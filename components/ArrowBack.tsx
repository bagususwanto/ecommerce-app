import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";

// Komponen untuk tombol back
export function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="mr-4" onPress={() => navigation.goBack()}>
      <ArrowLeft size={20} className="text-white font-extrabold" />
    </TouchableOpacity>
  );
}
