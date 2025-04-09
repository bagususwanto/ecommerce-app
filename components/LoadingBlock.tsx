import { ActivityIndicator } from "react-native";
import { Modal, View } from "react-native";
import { Text } from "./ui/text";

const LoadingBlock = () => {
  return (
    <Modal transparent={true} animationType="none">
      <View className="flex-1 justify-center items-center bg-black opacity-40">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Processing your order...</Text>
      </View>
    </Modal>
  );
};

export default LoadingBlock;
