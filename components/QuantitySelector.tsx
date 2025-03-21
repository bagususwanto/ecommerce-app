import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

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
      <TouchableOpacity className="px-3 py-1" onPress={decrease}>
        <Text className="text-2xl">-</Text>
      </TouchableOpacity>
      <TextInput
        className="text-lg font-bold text-center px-3 py-1"
        inputMode="numeric"
        value={inputValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        cursorColor={"blue"}
        style={{ minWidth: Math.max(40, inputValue.length * 14) }}
      />
      <TouchableOpacity className="px-3 py-1" onPress={increase}>
        <Text className="text-2xl">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
