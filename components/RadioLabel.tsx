import { TouchableOpacity, View } from "react-native";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Text } from "./ui/text";

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
  disabled = false,
  additional = "",
}: {
  value: string;
  onLabelPress: () => void;
  disabled?: boolean;
  additional?: string;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onLabelPress}
      className="border-b border-gray-200">
      <View className={"flex-row gap-2 justify-between items-center px-4 pb-3"}>
        {additional ? (
          <View className="flex-col">
            <Text className="text-xs font-light">{additional}</Text>
            <Label
              onPress={onLabelPress}
              className={`font-normal ${disabled ? "font-extralight" : ""}`}
              nativeID={`label-for-${value}`}>
              {value}
            </Label>
          </View>
        ) : (
          <Label
            onPress={onLabelPress}
            className={`font-normal ${disabled ? "font-extralight" : ""}`}
            nativeID={`label-for-${value}`}>
            {value}
          </Label>
        )}
        <RadioGroupItem
          aria-labelledby={`label-for-${value}`}
          value={value}
          disabled={disabled}
        />
      </View>
    </TouchableOpacity>
  );
}

export default RadioGroupItemWithLabel;
