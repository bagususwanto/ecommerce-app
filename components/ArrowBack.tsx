import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";

interface BackButtonProps {
  onPress?: () => void;
}

// Komponen untuk tombol back
export function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="mr-4"
      onPress={onPress ?? (() => navigation.goBack())} 
    >
      <ArrowLeft size={20} className="text-white font-extrabold" />
    </TouchableOpacity>
  );
}
