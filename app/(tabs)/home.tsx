import {
  Image,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Heart } from "lucide-react-native";
import MyCarousel from "~/components/Carousel";
import { Text } from "~/components/ui/text";
import { ProductList } from "~/components/ProductCard";
import { useCart } from "~/context/CartContext";
import { ScrollView } from "react-native";
import { useNotif } from "~/context/NotifContext";
import { useEffect, useRef } from "react";
import { useScroll } from "~/context/ScrollContext";
import { TouchableOpacity } from "react-native";
import { SearchBox } from "~/components/header/ui/searchbox";
import { LocationSelect } from "~/components/header/ui/locationselect";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import products from "~/dummy/product";

const categories = [
  { name: "Electronics", img: "https://picsum.photos/50?random=1" },
  { name: "Fashion", img: "https://picsum.photos/50?random=2" },
  { name: "Groceries", img: "https://picsum.photos/50?random=3" },
  { name: "Books", img: "https://picsum.photos/50?random=4" },
  { name: "Fitness", img: "https://picsum.photos/50?random=5" },
];

export default function HomeScreen() {
  const { handleAddToCart, bottomSheetRef } = useCart();
  const { notifBottomSheetRef } = useNotif();
  const { handleScroll, setIsScrolled } = useScroll();
  const router = useRouter();
  const scrollHomeRef = useRef<ScrollView>(null);

  useEffect(() => {
    setIsScrolled(false);
    scrollHomeRef.current?.scrollTo({ y: 0, animated: false }); // Reset scroll
  }, []);

  return (
    <ScrollView
      ref={scrollHomeRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Tutup keyboard jika terbuka
          bottomSheetRef.current?.close(); // Tutup BottomSheet
          notifBottomSheetRef.current?.close();
        }}>
        <LinearGradient
          colors={[
            "#04349c",
            "#04349c",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
          ]}
          className="flex-1">
          <View className="px-4 py-4 mt-10">
            <View className="flex-col w-[20%]">
              <LocationSelect />
            </View>
            <View className="flex-row items-center mt-4">
              <SearchBox
                placeholder="Search product..."
                className="flex-1 border border-gray-400"
                toSearch={() => {
                  router.push("/search");
                }}
              />

              {/* Wishlist Button */}
              {/* <TouchableOpacity className="ml-4 border-2 border-white rounded-full p-2 shadow-md">
                <Heart color="white" size={16} />
              </TouchableOpacity> */}
            </View>

            <MyCarousel />

            {/* Category */}
            <View className="flex-row mt-8 justify-around">
              {categories.map((item, index) => (
                <View key={index} className="items-center">
                  <Pressable>
                    <Image
                      source={{ uri: item.img }}
                      className="w-12 h-12 rounded-full shadow-md"
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Text className="text-gray-700 mt-2 text-sm">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-black  font-semibold text-xl mt-4">
              {/* Your Frequent Orders */}
              For You
            </Text>
            <View className="w-full">
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
