import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";

type IconButtonProps = {
  icon?: any;
  counting?: boolean;
  count?: number;
  onPress?: () => void;
  className?: string;
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
};

const IconButton = ({
  icon: Icon,
  counting = false,
  count = 0,
  onPress = () => {},
  className = "",
  size = 24,
  color = "white",
  fill = false,
  fillColor = "white",
}: IconButtonProps) => {
  return (
    <TouchableOpacity className={cn("", className)} onPress={onPress}>
      {counting && count > 0 && (
        <View className="bg-red-500 absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10">
          <Text className="text-white text-xs font-bold">{count}</Text>
        </View>
      )}
      <Icon color={color} fill={fill ? fillColor : "none"} size={size} />
    </TouchableOpacity>
  );
};

export default IconButton;
