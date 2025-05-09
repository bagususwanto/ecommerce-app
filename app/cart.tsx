import { useRouter } from "expo-router";
import { Heart, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { NotifiBottomSheet } from "~/components/BottomSheet";
import IconButton from "~/components/IconButton";
import { ProductUI } from "~/components/ProductUI";
import QuantitySelector from "~/components/QuantitySelector";
import ToastSuccess from "~/components/ToastSuccess";
import toastConfigSuccess from "~/components/ToastSuccess";
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
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import { useCart } from "~/context/CartContext";
import { useCheckout } from "~/context/CheckoutContext";
import { useNotif } from "~/context/NotifContext";
import { useSearch } from "~/context/SearchContext";
import { useWishlist } from "~/context/WishlistContext";
import { Cart } from "~/types/cart";

export default function CartScreen() {
  const { cartItems, setCartItems } = useCart();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { isChange, setIsChange } = useCart();
  const router = useRouter();
  const { setCheckoutItems } = useCheckout();
  const { setSearchTerm } = useSearch();
  const {
    wishlistItems,
    setWishlistItems,
    setSelectedWishlist,
    selectedWishlist,
  } = useWishlist();
  const { setNotifProps, notifBottomSheetRef } = useNotif();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    setIsChange(false);
    setCheckedItems({});
    setSearchTerm("");
  }, []);

  useEffect(() => {
    if (selectedWishlist && hasTriggered) {
      notifBottomSheetRef.current?.present();
    }
  }, [selectedWishlist]);

  const isAllChecked =
    cartItems.length > 0 &&
    cartItems.every((item) => checkedItems[item.productNo]);

  const isWishlist = (cart: Cart): boolean => {
    return wishlistItems.some((item) => item.productNo === cart.productNo);
  };

  const onWishlist = (cart: Cart) => {
    const updatedWishlistItems = isWishlist(cart)
      ? wishlistItems.filter((item) => item.productNo !== cart.productNo)
      : [
          ...wishlistItems,
          {
            productNo: cart.productNo,
            productName: cart.productName,
            imageUrl: cart.imageUrl,
            minOrder: cart.minOrder,
          },
        ];

    setWishlistItems(updatedWishlistItems);

    if (!isWishlist(cart)) {
      setSelectedWishlist({
        productNo: cart.productNo,
        productName: cart.productName,
        imageUrl: cart.imageUrl,
        minOrder: cart.minOrder,
      });

      setNotifProps({
        title: "Product added to wishlist",
        description: "Product has been added to your wishlist",
        buttonText: "Go to wishlist",
        routeName: "/wishlist",
      });
      setHasTriggered(true);
    } else {
      Toast.show({
        type: "success",
        text1: "Item removed from wishlist",
        position: "bottom",
        bottomOffset: 100,
      });
    }
  };

  const handleQuantityChange = (cart: Cart, text: string) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue) && parsedValue >= cart.minOrder) {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cart.productNo
            ? { ...item, quantity: parsedValue }
            : item
        )
      );
    } else {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productNo === cart.productNo
            ? { ...item, quantity: cart.minOrder }
            : item
        )
      );
    }
  };

  const handleCheckedChange = (productNo: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [productNo]: !prevCheckedItems[productNo], // Toggle status
    }));
  };

  // Hitung jumlah item yang dicheck
  const selectedItems = cartItems.filter(
    (item) => checkedItems[item.productNo]
  );

  // Fungsi untuk memilih/deselect semua item
  const handleSelectAll = () => {
    if (isAllChecked) {
      // Uncheck all
      setCheckedItems({});
    } else {
      // Check all
      const newChecked = cartItems.reduce((acc, item) => {
        acc[item.productNo] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setCheckedItems(newChecked);
    }
  };

  const handleDelete = (productNo: string) => {
    const itemToDelete = cartItems.find((item) => item.productNo === productNo);
    if (!itemToDelete) return;

    setCartItems((prevCart) =>
      prevCart.filter((item) => item.productNo !== productNo)
    );

    Toast.show({
      type: "success",
      text1: "Item deleted",
      text2: "Click 'Undo' to restore",
      position: "bottom",
      props: { onUndo: () => handleUndo(itemToDelete) }, // Pastikan ini sesuai dengan toastConfig
    });
    console.log("deleted");
  };

  const handleUndo = (item: Cart) => {
    setCartItems((prevCart) => [...prevCart, item]);

    Toast.hide();
  };

  const handleDeleteSelection = (selectedItems: Cart[]) => {
    const itemsToDelete = selectedItems.map((item) => item.productNo);
    setCartItems((prevCart) =>
      prevCart.filter((item) => !itemsToDelete.includes(item.productNo))
    );

    Toast.show({
      type: "success",
      text1: `${selectedItems.length} Items deleted`,
      position: "bottom",
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }} // Sesuaikan padding agar tidak tertutup tombol checkout
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // Tutup keyboard jika terbuka
            notifBottomSheetRef.current?.close();
          }}>
          <View className="flex-1 items-center">
            {cartItems.length === 0 ? (
              <Text className="text-gray-500 text-lg text-center">
                Cart is empty
              </Text>
            ) : (
              cartItems.map((cart) => (
                <Card
                  key={cart.productNo}
                  className="p-4 border border-gray-200 w-full">
                  <View className="flex-row justify-between items-center mb-4">
                    <Checkbox
                      className="h-5 w-5 border border-gray-500"
                      checked={checkedItems[cart.productNo] || false}
                      onCheckedChange={() =>
                        handleCheckedChange(cart.productNo)
                      }
                    />
                    <IconButton
                      icon={Trash2}
                      color="gray"
                      size={20}
                      onPress={() => handleDelete(cart.productNo)}
                    />
                  </View>
                  <ProductUI imageClassName="w-32 h-32" products={cart} />
                  <View className="flex-row items-center justify-end mt-4 gap-44">
                    <IconButton
                      icon={Heart}
                      size={20}
                      color={isWishlist(cart) ? "red" : "gray"}
                      onPress={() => onWishlist(cart)}
                      fill={isWishlist(cart) ? "red" : "transparent"}
                    />
                    <View className="flex-row h-12 items-center gap-4 border border-gray-300 rounded-lg px-4">
                      <QuantitySelector
                        quantity={cart.quantity}
                        setQuantity={(newQuantity) =>
                          handleQuantityChange(cart, String(newQuantity))
                        }
                      />
                    </View>
                  </View>
                </Card>
              ))
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Tombol Checkout di bagian bawah */}
      {cartItems.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center gap-2">
              <Checkbox
                className="h-5 w-5 border border-gray-500"
                checked={isAllChecked}
                onCheckedChange={handleSelectAll}
              />
              <Text className="text-gray-700">Select All</Text>
            </View>
            {isChange ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className=" py-3 rounded-lg items-center"
                    disabled={selectedItems.length === 0}>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-primary text-lg font-bold">
                        Delete ({selectedItems.length} items)
                      </Text>
                    </View>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete {selectedItems.length} items?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the selected items from your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row justify-center">
                    <AlertDialogCancel className="flex-grow">
                      <Text className="text-primary">Cancel</Text>
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onPress={() => handleDeleteSelection(selectedItems)}
                      className="flex-grow">
                      <Text>Delete</Text>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                className="bg-primary py-3 rounded-lg items-center"
                disabled={selectedItems.length === 0}
                onPress={() => {
                  setCheckoutItems(selectedItems);
                  router.push("/checkout");
                }}>
                <View className="flex-row items-center gap-2">
                  <Text className="text-white text-lg font-bold">
                    Checkout ({selectedItems.length} items)
                  </Text>
                </View>
              </Button>
            )}
          </View>
        </View>
      )}

      <NotifiBottomSheet
        ref={notifBottomSheetRef}
        selectedProduct={selectedWishlist}
      />
    </View>
  );
}
