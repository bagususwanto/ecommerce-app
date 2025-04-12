import { View } from "react-native";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { Text } from "./ui/text";
import { TouchableOpacity } from "react-native";

const toastConfigSuccess = {
  success: ({ text1, text2, props }: ToastConfigParams<any>) => (
    <View className="bg-black p-2 rounded-lg flex-row justify-between items-center shadow-lg">
      <View className="flex-row">
        <Text className="font-normal text-white">{text1}</Text>
        {text2 && <Text className="font-normal text-white ml-1">{text2}</Text>}
      </View>
      {props.onUndo && (
        <TouchableOpacity onPress={props.onUndo} className="ml-4">
          <Text className="text-white font-bold">Undo</Text>
        </TouchableOpacity>
      )}
    </View>
  ),
};

const ToastSuccess = () => {
  return <Toast config={toastConfigSuccess} />;
};

export default ToastSuccess;
