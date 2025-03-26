import React, { useState, useEffect } from "react";
import { View, TextInput, Keyboard } from "react-native";
import IconButton from "./IconButton";
import { Minus, Plus } from "lucide-react-native";

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const increase = () => {
    if (quantity < max) setQuantity(quantity + 1);
    Keyboard.dismiss();
  };

  const decrease = () => {
    if (quantity > min) setQuantity(quantity - 1);
    Keyboard.dismiss();
  };

  const handleChange = (text: string) => {
    setInputValue(text);
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= min && num <= max) {
      setQuantity(num);
    }
  };

  const handleBlur = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num < min || num > max) {
      setInputValue(quantity.toString()); // Kembalikan ke nilai sebelumnya jika tidak valid
    }
  };

  return (
    <View className="flex-row items-center space-x-2">
      <IconButton
        className="px-3"
        icon={Minus}
        color="gray"
        size={18}
        onPress={decrease}
      />
      <TextInput
        className="text-md text-center px-3 w-12"
        inputMode="numeric"
        value={inputValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        cursorColor={"blue"}
      />
      <IconButton
        className="px-3"
        icon={Plus}
        color="gray"
        size={18}
        onPress={increase}
      />
    </View>
  );
};

export default QuantitySelector;
