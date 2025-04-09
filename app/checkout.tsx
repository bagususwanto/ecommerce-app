import { useRouter } from "expo-router";
import {
  AlarmClock,
  ArrowDown,
  ChevronRight,
  MapPin,
  NotebookPen,
  ShoppingBasket,
  Truck,
  Warehouse,
} from "lucide-react-native";
import { useEffect,  useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NoteBottomSheet } from "~/components/BottomSheet";
import LoadingBlock from "~/components/LoadingBlock";
import RadioGroupItemWithLabel from "~/components/RadioLabel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { RadioGroup} from "~/components/ui/radio-group";
import { Text } from "~/components/ui/text";
import { useCheckout } from "~/context/CheckoutContext";

export default function CheckoutScreen() {
  const [deliveryType, setDeliveryType] = useState<string>("Otodoke");
  const [deliveryTime, setDeliveryTime] = useState<string>("09:00 - 12:00");
  const [giMethod, setGiMethod] = useState<string>("123456789");
  const isPickup = deliveryType === "Pickup";
  const { noteBottomSheetRef, note, checkoutItems } = useCheckout();
  const [showAllItems, setShowAllItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    isPickup ? setDeliveryTime("") : setDeliveryTime("09:00 - 12:00");
  }, [deliveryType]);

  const handleOrder = async () => {
    setIsLoading(true);

    // Simulasi proses submit (API call, dsb)
    setTimeout(() => {
      setIsLoading(false);
      router.push("/transaction");
    }, 2000);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // Tutup keyboard jika terbuka
            noteBottomSheetRef.current?.close();
          }}>
          <View className="flex-1 items-center">
            <Card className="p-4 border border-gray-200 w-full">
              <Text className="font-bold text-black text-md flex-wrap">
                Shipping Information
              </Text>
              <View className="flex-row items-center gap-2 mt-3">
                <Warehouse color="black" size={18} />
                <Text className="text-black font-normal text-md">Shop 1</Text>
              </View>
              <View className="flex-row items-center gap-2 mt-3">
                <ArrowDown color="black" size={18} />
              </View>
              <View className="flex-row font-normal items-center gap-2 mt-3">
                <MapPin color="black" size={18} />
                <Text className="text-black text-md">
                  123 Main St, Anytown, USA
                </Text>
              </View>
            </Card>
            <Card className="mt-1 w-full">
              <View className="p-4">
                <Text className="font-bold text-black text-md flex-wrap">
                  Delivery Type
                </Text>
                <View className="flex-row items-center gap-2 mt-3">
                  <Truck color="black" size={18} />
                  <Text className="text-black font-medium text-md">
                    Choose delivery method:
                  </Text>
                </View>
              </View>
              <View className="flex-1">
                <RadioGroup
                  value={deliveryType}
                  onValueChange={setDeliveryType}
                  className="gap-3">
                  <RadioGroupItemWithLabel
                    value="Otodoke"
                    onLabelPress={() => setDeliveryType("Otodoke")}
                  />
                  <RadioGroupItemWithLabel
                    value="Pickup"
                    onLabelPress={() => {
                      setDeliveryTime("");
                      setDeliveryType("Pickup");
                    }}
                  />
                </RadioGroup>
              </View>
            </Card>
            <Card className="mt-1 w-full">
              <View className="p-4">
                <Text className="font-bold text-black text-md flex-wrap">
                  Delivery Time
                </Text>
                <View className="flex-row items-center gap-2 mt-3">
                  <AlarmClock color="black" size={18} />
                  <Text className="text-black font-medium text-md">
                    Select Time:
                  </Text>
                </View>
              </View>
              <View className="flex-1">
                <RadioGroup
                  disabled={isPickup}
                  value={deliveryTime}
                  onValueChange={setDeliveryTime}
                  className="gap-3">
                  <RadioGroupItemWithLabel
                    value="09:00 - 12:00"
                    onLabelPress={() =>
                      !isPickup && setDeliveryTime("09:00 - 12:00")
                    }
                    disabled={isPickup}
                  />
                  <RadioGroupItemWithLabel
                    value="13:00 - 16:00"
                    onLabelPress={() =>
                      !isPickup && setDeliveryTime("13:00 - 16:00")
                    }
                    disabled={isPickup}
                  />
                </RadioGroup>
              </View>
            </Card>
            <Card className="mt-1 w-full">
              <View className="p-4">
                <Text className="font-bold text-black text-md flex-wrap">
                  GI Method
                </Text>
              </View>
              <View className="flex-1">
                <RadioGroup
                  value={giMethod}
                  onValueChange={setGiMethod}
                  className="gap-3">
                  <RadioGroupItemWithLabel
                    value={"123456789"}
                    onLabelPress={() => setGiMethod("123456789")}
                    additional="GIC"
                  />
                  <RadioGroupItemWithLabel
                    value={"WB-123456789"}
                    onLabelPress={() => setGiMethod("WB-123456789")}
                    additional="WBS"
                  />
                </RadioGroup>
              </View>
            </Card>
            <Card className="p-4 border border-gray-200 w-full">
              <Text className="font-bold text-black text-md flex-wrap">
                Order Summary
              </Text>
              <View className="flex-row items-center gap-2 mt-3">
                <ShoppingBasket color="black" size={18} />
                <Text className="text-black font-medium text-md">
                  {checkoutItems.length} Items
                </Text>
              </View>
              {(showAllItems ? checkoutItems : checkoutItems.slice(0, 3)).map(
                (item) => (
                  <View
                    key={item.productNo}
                    className="flex-row items-center gap-2 mt-3">
                    <Image
                      source={{
                        uri: item.imageUrl,
                      }}
                      className="rounded-md w-10 h-10"
                      alt={item.productNo}
                      resizeMode="cover"
                    />
                    <View className="flex flex-col w-[85%]">
                      <Text className="text-black font-normal text-md flex-wrap">
                        {item.productName}
                      </Text>
                      <Text className="text-black font-light text-xs flex-wrap">
                        {item.productNo}
                      </Text>
                    </View>
                    <View className="flex-col items-center">
                      <Text className="text-black font-normal text-sm flex-wrap">
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                )
              )}
              {checkoutItems.length > 3 && (
                <TouchableOpacity
                  className="mt-3"
                  onPress={() => setShowAllItems((prev) => !prev)}>
                  <Text className="text-primary text-sm font-medium">
                    {showAllItems ? "View Less" : "View More"}
                  </Text>
                </TouchableOpacity>
              )}
            </Card>
            <Card className="mt-1 w-full">
              <View className="p-4">
                <Text className="font-bold text-black text-md flex-wrap">
                  Notes (Optional)
                </Text>
                <TouchableOpacity
                  onPress={() => noteBottomSheetRef.current?.present()}>
                  <View className="flex-row items-center justify-between mt-3">
                    <View className="flex-row items-center gap-2">
                      <NotebookPen color="black" size={18} />
                      <Text className="text-black font-medium text-md">
                        Add a note
                      </Text>
                    </View>
                    <View className="flex-row items-center max-w-[250px]">
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        className="text-black font-extralight text-md">
                        {note || "Leave a message"}
                      </Text>
                      <ChevronRight color="gray" size={16} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Tombol Order di bagian bawah */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
        <View className="flex-row justify-end mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-primary py-3 rounded-lg items-end">
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg font-bold">Submit An Order</Text>
                </View>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to order these items?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please verify the details of your order before finalizing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row justify-center">
                <AlertDialogCancel className="flex-grow">
                  <Text className="text-primary">Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction onPress={handleOrder} className="flex-grow">
                  <Text>Order</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>

      <NoteBottomSheet ref={noteBottomSheetRef} />
      {isLoading && <LoadingBlock />}
    </View>
  );
}
